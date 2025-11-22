import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a professional resume writer. Create a structured resume JSON based on the user's description. Infer missing details where reasonable. Structure: personalInfo, summary, experience, education, skills.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            response_format: { type: "json_object" },
        });

        const structuredData = JSON.parse(completion.choices[0].message.content || "{}");

        const session = await prisma.resumeSession.create({
            data: {
                mode: "prompt",
                rawData: { prompt },
                structuredData,
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error generating from prompt:", error);
        return NextResponse.json(
            { error: "Failed to generate resume" },
            { status: 500 }
        );
    }
}
