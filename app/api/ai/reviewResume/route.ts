import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assuming prisma client is exported from here
import { openai } from "@/lib/openai";
import { ResumeReview } from "@/lib/types";

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            );
        }

        const session = await prisma.resumeSession.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return NextResponse.json(
                { error: "Session not found" },
                { status: 404 }
            );
        }

        const structuredData = session.structuredData as any;

        if (!structuredData) {
            return NextResponse.json(
                { error: "No resume data found to review" },
                { status: 400 }
            );
        }

        const prompt = `
      You are an expert resume reviewer and career coach. Your task is to review the following resume data and provide a structured assessment.
      
      RESUME DATA:
      ${JSON.stringify(structuredData, null, 2)}
      
      Evaluate the resume along these dimensions:
      1. Clarity and readability
      2. Impact and use of metrics
      3. Structure and section ordering
      4. ATS friendliness
      5. Consistency and tone
      
      Provide the output strictly in the following JSON format:
      {
        "overallScore": number (0-100),
        "summaryRating": "string (short narrative explaining the score)",
        "strengths": ["string", "string", ...],
        "weakAreas": ["string", "string", ...],
        "quickTips": ["string", "string", ...]
      }
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // Using GPT-4 Turbo as proxy for 4.1
            messages: [
                {
                    role: "system",
                    content: "You are a helpful and strict resume critic. Output only valid JSON.",
                },
                { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
        });

        const reviewContent = completion.choices[0].message.content;

        if (!reviewContent) {
            throw new Error("Failed to generate review");
        }

        const review: ResumeReview = {
            ...JSON.parse(reviewContent),
            createdAt: new Date().toISOString(),
        };

        // Save the review back to the session
        const updatedStructuredData = {
            ...structuredData,
            review,
        };

        await prisma.resumeSession.update({
            where: { id: sessionId },
            data: {
                structuredData: updatedStructuredData,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Error generating review:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
