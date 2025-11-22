import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
    try {
        const { structuredData } = await request.json();

        const prompt = `Analyze the following resume data and generate a list of relevant technical and soft skills.
    
    Resume Data: ${JSON.stringify(structuredData).slice(0, 3000)}... (truncated)
    
    Return the result as a JSON object with a "skills" array of strings.`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4-turbo',
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');

        return NextResponse.json({ result: result.skills || [] });
    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
    }
}
