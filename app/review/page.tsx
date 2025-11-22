import { prisma } from "@/lib/prisma";
import { ReviewClient } from "./ReviewClient";
import { redirect } from "next/navigation";

export default async function ReviewPage({
    searchParams,
}: {
    searchParams: { sessionId: string };
}) {
    const sessionId = searchParams.sessionId;

    if (!sessionId) {
        redirect("/");
    }

    const session = await prisma.resumeSession.findUnique({
        where: { id: sessionId },
    });

    if (!session) {
        return <div>Session not found</div>;
    }

    // Parse structuredData if it's a string (though Prisma usually handles Json type as object)
    // But to be safe and ensure type compatibility for client component
    const structuredData = session.structuredData as any;

    return (
        <div className="min-h-screen bg-gray-50">
            <ReviewClient
                sessionId={sessionId}
                initialData={structuredData}
                updatedAt={session.updatedAt.toISOString()}
            />
        </div>
    );
}
