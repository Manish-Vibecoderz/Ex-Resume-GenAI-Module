import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("sessionId");

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            );
        }

        const session = await prisma.resumeSession.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return NextResponse.json(
                { error: "Session not found" },
                { status: 404 }
            );
        }

        const structuredData = session.structuredData as any;
        const { personalDetails, summary, experience, skills, education, extras } = structuredData;

        const children = [];

        // Header
        if (personalDetails) {
            children.push(
                new Paragraph({
                    text: personalDetails.fullName || "Your Name",
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                })
            );

            const contactInfo = [
                personalDetails.email,
                personalDetails.phone,
                personalDetails.location,
                personalDetails.linkedin,
                personalDetails.website,
            ]
                .filter(Boolean)
                .join(" | ");

            children.push(
                new Paragraph({
                    text: contactInfo,
                    alignment: AlignmentType.CENTER,
                })
            );
            children.push(new Paragraph({ text: "" })); // Spacer
        }

        // Summary
        if (summary) {
            children.push(
                new Paragraph({
                    text: "SUMMARY",
                    heading: HeadingLevel.HEADING_2,
                })
            );
            children.push(
                new Paragraph({
                    text: summary,
                })
            );
            children.push(new Paragraph({ text: "" }));
        }

        // Experience
        if (experience && experience.length > 0) {
            children.push(
                new Paragraph({
                    text: "EXPERIENCE",
                    heading: HeadingLevel.HEADING_2,
                })
            );
            for (const exp of experience) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: exp.position,
                                bold: true,
                                size: 24,
                            }),
                        ],
                    })
                );
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${exp.company} | ${exp.startDate} - ${exp.endDate || "Present"}`,
                                italics: true,
                            }),
                        ],
                    })
                );
                children.push(
                    new Paragraph({
                        text: exp.description,
                    })
                );
                children.push(new Paragraph({ text: "" }));
            }
        }

        // Education
        if (education && education.length > 0) {
            children.push(
                new Paragraph({
                    text: "EDUCATION",
                    heading: HeadingLevel.HEADING_2,
                })
            );
            for (const edu of education) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: edu.institution,
                                bold: true,
                            }),
                        ],
                    })
                );
                children.push(
                    new Paragraph({
                        text: `${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""} | ${edu.startDate} - ${edu.endDate || "Present"}`,
                    })
                );
                children.push(new Paragraph({ text: "" }));
            }
        }

        // Skills
        if (skills && skills.length > 0) {
            children.push(
                new Paragraph({
                    text: "SKILLS",
                    heading: HeadingLevel.HEADING_2,
                })
            );
            const skillText = skills
                .map((s: any) => (typeof s === "string" ? s : s.name))
                .join(", ");
            children.push(
                new Paragraph({
                    text: skillText,
                })
            );
            children.push(new Paragraph({ text: "" }));
        }

        // Extras
        if (extras && extras.length > 0) {
            children.push(
                new Paragraph({
                    text: "ADDITIONAL",
                    heading: HeadingLevel.HEADING_2,
                })
            );
            for (const extra of extras) {
                children.push(
                    new Paragraph({
                        text: extra,
                        bullet: {
                            level: 0,
                        },
                    })
                );
            }
        }

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: children,
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);

        return new NextResponse(buffer, {
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": 'attachment; filename="resume.docx"',
            },
        });
    } catch (error) {
        console.error("Error generating DOCX:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
