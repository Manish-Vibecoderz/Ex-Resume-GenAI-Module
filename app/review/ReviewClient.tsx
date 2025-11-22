"use client";

import React, { useState } from "react";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResumeReview } from "@/lib/types";
import { Loader2, Download, RefreshCw, CheckCircle, AlertCircle, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ReviewClientProps {
    sessionId: string;
    initialData: any;
    updatedAt: string;
}

export function ReviewClient({ sessionId, initialData, updatedAt }: ReviewClientProps) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState<ResumeReview | null>(initialData.review || null);

    const isStale = review?.createdAt && new Date(review.createdAt) < new Date(updatedAt);

    const handleGenerateReview = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/ai/reviewResume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId }),
            });
            const newReview = await res.json();
            setReview(newReview);
            // Update local data to include the new review
            setData({ ...data, review: newReview });
        } catch (error) {
            console.error("Failed to generate review", error);
        } finally {
            setLoading(false);
        }
    };

    const scoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const scoreLabel = (score: number) => {
        if (score >= 80) return "Strong";
        if (score >= 60) return "Average";
        return "Needs Work";
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
            {/* Left Panel - AI Review */}
            <div className="w-full lg:w-1/2 p-6 overflow-y-auto border-r border-gray-200 bg-white">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">AI Review</h1>
                        <Link href={`/editor?sessionId=${sessionId}`}>
                            <Button variant="outline" size="sm">Back to Editor</Button>
                        </Link>
                    </div>

                    {isStale && review && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-sm font-semibold text-yellow-900">Resume Modified</h4>
                                <p className="text-sm text-yellow-800 mt-1">
                                    You edited your resume after this review was generated. Consider regenerating for accurate feedback.
                                </p>
                                <Button
                                    variant="link"
                                    className="text-yellow-900 p-0 h-auto font-semibold mt-2"
                                    onClick={handleGenerateReview}
                                    disabled={loading}
                                >
                                    Regenerate Review
                                </Button>
                            </div>
                        </div>
                    )}

                    {!review ? (
                        <Card className="border-dashed border-2">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="bg-gray-100 p-4 rounded-full mb-4">
                                    <Lightbulb className="w-8 h-8 text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Get AI Feedback
                                </h3>
                                <p className="text-gray-500 mb-6 max-w-xs">
                                    Let our AI analyze your resume and provide actionable tips to improve your score.
                                </p>
                                <Button onClick={handleGenerateReview} disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Generate Review
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Overall Score */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Overall Score
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-4">
                                        <span className={`text-6xl font-bold ${scoreColor(review.overallScore)}`}>
                                            {review.overallScore}
                                        </span>
                                        <span className="text-xl font-medium text-gray-600">
                                            {scoreLabel(review.overallScore)}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-gray-700 leading-relaxed">
                                        {review.summaryRating}
                                    </p>
                                    <div className="mt-4">
                                        <Button variant="outline" size="sm" onClick={handleGenerateReview} disabled={loading}>
                                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                                            Regenerate
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Strengths */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Strengths
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {review.strengths.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Weak Areas */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        Weak Areas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {review.weakAreas.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Quick Tips */}
                            <Card className="bg-blue-50 border-blue-100">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-blue-900">
                                        <Lightbulb className="w-5 h-5 text-blue-600" />
                                        Quick Tips
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {review.quickTips.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-blue-800">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Download Section */}
                    <div className="pt-8 border-t border-gray-200">
                        <h2 className="text-lg font-semibold mb-4">Download Resume</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href={`/download/pdf?sessionId=${sessionId}`} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full h-12 text-lg" variant="default">
                                    <Download className="mr-2 h-5 w-5" />
                                    Download PDF
                                </Button>
                            </a>
                            <a href={`/download/docx?sessionId=${sessionId}`} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full h-12 text-lg" variant="outline">
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Word
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="hidden lg:block w-1/2 bg-gray-100 p-8 overflow-y-auto">
                <div className="max-w-[210mm] mx-auto shadow-2xl">
                    <ResumePreview structuredData={data} presentation={data.presentation} />
                </div>
            </div>
        </div>
    );
}
