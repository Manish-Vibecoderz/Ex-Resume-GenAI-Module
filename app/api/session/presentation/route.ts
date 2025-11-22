import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ResumePresentation } from "@/types/resume";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { sessionId, presentation } = body;

        if (!sessionId || !presentation) {
            return NextResponse.json(
                { error: "Missing sessionId or presentation data" },
                { status: 400 }
            );
        }

        // Fetch existing session to get current structuredData
        const session = await prisma.resumeSession.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        // Merge presentation into structuredData
        const currentData = session.structuredData as any; // Type assertion for JSON
        const updatedData = {
            ...currentData,
            presentation: presentation as ResumePresentation,
        };

        // Update session
        const updatedSession = await prisma.resumeSession.update({
            where: { id: sessionId },
            data: {
                structuredData: updatedData,
            },
        });

        return NextResponse.json(updatedSession);
    } catch (error) {
        console.error("Error updating presentation:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
