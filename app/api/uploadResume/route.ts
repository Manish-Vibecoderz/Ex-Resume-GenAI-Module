import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import OpenAI from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function extractTextFromFile(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/pdf") {
        try {
            const data = await pdf(buffer);
            return data.text;
        } catch (e) {
            console.error("PDF parse error:", e);
            throw new Error("Failed to parse PDF");
        }
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } catch (e) {
            console.error("DOCX parse error:", e);
            throw new Error("Failed to parse DOCX");
        }
    }
    return "";
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        // Validate file size (Max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
        }

        const text = await extractTextFromFile(file);

        if (!text.trim()) {
            return NextResponse.json({ error: "Could not extract text from file" }, { status: 400 });
        }

        // AI Extraction
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a resume parser. Extract the following sections from the resume text: personalInfo (name, email, phone, location, linkedin, website), summary, experience (company, position, startDate, endDate, description, location), education (school, degree, fieldOfStudy, startDate, endDate, grade), skills (list of strings), projects (name, description, url, technologies). Return as JSON.",
                },
                {
                    role: "user",
                    content: `Resume Text:\n${text}`,
                },
            ],
            response_format: { type: "json_object" },
        });

        const structuredData = JSON.parse(completion.choices[0].message.content || "{}");

        const session = await prisma.resumeSession.create({
            data: {
                mode: "upload",
                rawData: { text }, // Store raw text
                structuredData,
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error uploading resume:", error);
        return NextResponse.json(
            { error: "Failed to upload resume" },
            { status: 500 }
        );
    }
}
