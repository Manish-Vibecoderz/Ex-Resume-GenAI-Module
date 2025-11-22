import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a resume builder. Create a structured resume JSON based on the conversation history. Structure: personalDetails (fullName, email, phone, location, linkedinUrl, websiteUrl, summary), experience (array with id, jobTitle, company, startDate, endDate, description), education (array with id, degree, school, startDate, endDate, description), skills (array of strings), projects (optional array with id, name, description, url).",
                },
                ...messages.map((m: any) => ({ role: m.role, content: m.content })),
            ],
            response_format: { type: "json_object" },
        });

        const structuredData = JSON.parse(completion.choices[0].message.content || "{}");

        const session = await prisma.resumeSession.create({
            data: {
                mode: "chatbot",
                rawData: { messages },
                structuredData,
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error building from QA:", error);
        return NextResponse.json(
            { error: "Failed to build resume" },
            { status: 500 }
        );
    }
}
