import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
    try {
        const { currentSummary, instruction } = await request.json();

        const prompt = `You are an expert resume writer. Rewrite the following professional summary to be more impactful, concise, and ATS-friendly.
    
    Current Summary: "${currentSummary || ''}"
    
    Instruction: ${instruction || 'Improve clarity and impact.'}
    
    Return only the rewritten summary text.`;

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
