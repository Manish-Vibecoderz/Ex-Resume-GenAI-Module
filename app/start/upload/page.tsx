"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileText, X, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UploadStartPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFile(droppedFile);
            setError(null);
        } else {
            setError("Please upload a PDF or DOCX file.");
        }
    }, []);

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/uploadResume", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            router.push(`/editor?sessionId=${data.sessionId}`);
        } catch (err) {
            setError("Failed to process resume. Please try again.");
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/start" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900">Upload Resume</h1>
                </div>

                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-zinc-200 hover:border-zinc-300"}
            ${file ? "bg-zinc-50 border-zinc-300" : ""}
          `}
                >
                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={onFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                    />

                    <div className="flex flex-col items-center gap-4 pointer-events-none">
                        {file ? (
                            <>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-900">{file.name}</p>
                                    <p className="text-sm text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-900">Click or drag file to upload</p>
                                    <p className="text-sm text-zinc-500">PDF or DOCX (Max 5MB)</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500 text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="w-full"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Upload & Continue"
                    )}
                </Button>
            </div>
        </div>
    );
}
