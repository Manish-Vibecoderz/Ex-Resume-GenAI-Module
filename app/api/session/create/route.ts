import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { mode } = body;

        if (!mode) {
            return NextResponse.json({ error: "Mode is required" }, { status: 400 });
        }

        const session = await prisma.resumeSession.create({
            data: {
                mode,
                structuredData: {}, // Initialize with empty data
            },
        });

        return NextResponse.json(session);
    } catch (error) {
        console.error("Error creating session:", error);
        return NextResponse.json(
            { error: "Failed to create session" },
            { status: 500 }
        );
    }
}
