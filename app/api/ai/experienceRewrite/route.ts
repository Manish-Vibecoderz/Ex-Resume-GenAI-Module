import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
    try {
        const { jobDescription, bullets, instruction } = await request.json();

        const prompt = `You are an expert resume writer. Improve the following experience bullet points.
    
    Job Description (Context): ${jobDescription || 'N/A'}
    
    Current Bullets:
    ${Array.isArray(bullets) ? bullets.join('\n') : bullets}
    
    Instruction: ${instruction || 'Make them result-oriented and quantifiable.'}
    
    Return the result as a JSON object with a "bullets" array of strings.`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4-turbo',
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');

        return NextResponse.json({ result: result.bullets || [] });
    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
    }
}
