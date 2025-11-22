import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import puppeteer from "puppeteer";
import { renderToStaticMarkup } from "react-dom/server";
import { ResumePreview } from "@/components/ResumePreview";
import fs from "fs";
import path from "path";

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

        // Read global CSS
        const cssPath = path.join(process.cwd(), "app", "globals.css");
        let css = "";
        try {
            css = fs.readFileSync(cssPath, "utf-8");
        } catch (e) {
            console.warn("Could not read globals.css", e);
        }

        // We might need to process Tailwind CSS to get actual styles if we just read the file.
        // Since we can't easily run the build process here, we'll assume a basic set of styles or try to use a CDN for Tailwind in the PDF for simplicity if local CSS fails.
        // A better approach for a real app is to use a specific print stylesheet or inline critical CSS.
        // For this task, we will inject a Tailwind CDN link to ensure styles work in the headless browser.

        const htmlContent = renderToStaticMarkup(
            <ResumePreview structuredData={ structuredData } presentation = { structuredData.presentation } />
    );

        const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; }
            @page { margin: 0; }
            /* Add any custom fonts here if needed */
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();

        await page.setContent(fullHtml, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
            },
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
