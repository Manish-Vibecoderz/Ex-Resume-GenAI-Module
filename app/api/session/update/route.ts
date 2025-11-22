import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { sessionId, structuredData } = body;

        if (!sessionId || !structuredData) {
            return NextResponse.json(
                { error: 'Missing sessionId or structuredData' },
                { status: 400 }
            );
        }

        const updatedSession = await prisma.resumeSession.update({
            where: { id: sessionId },
            data: {
                structuredData,
            },
        });

        return NextResponse.json(updatedSession);
    } catch (error) {
        console.error('Error updating session:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
