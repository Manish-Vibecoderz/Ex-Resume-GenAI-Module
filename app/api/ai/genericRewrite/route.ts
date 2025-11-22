import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
    try {
        const { text, instruction } = await request.json();

        const prompt = `Rewrite the following text for a resume.
    
    Text: "${text}"
    
    Instruction: ${instruction || 'Improve professional tone.'}
    
    Return only the rewritten text.`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4-turbo',
        });

        const rewrittenText = completion.choices[0].message.content;

        return NextResponse.json({ result: rewrittenText });
    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
    }
}
