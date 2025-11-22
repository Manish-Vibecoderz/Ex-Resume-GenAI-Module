import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
        }

        // Determine if we have enough info or should ask more
        // We can ask GPT to decide if it has enough info to build a resume.

        const systemPrompt = `
      You are a professional resume interviewer. Your goal is to collect information to build a resume.
      Ask questions one by one.
      Required info: Name, Current Role, Experience (at least 1 role), Skills, Education.
      
      Current state of conversation:
      ${JSON.stringify(messages)}
      
      If you have enough information to build a minimal resume, set 'finished' to true in the JSON response.
      Otherwise, set 'finished' to false and provide the next 'message' to ask the user.
      
      Response format: { "finished": boolean, "message": string }
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((m: any) => ({ role: m.role, content: m.content })),
            ],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content || "{}");

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in chat:", error);
        return NextResponse.json(
            { error: "Chat failed" },
            { status: 500 }
        );
    }
}
