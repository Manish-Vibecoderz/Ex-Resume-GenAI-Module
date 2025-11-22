"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, LayoutTemplate, Upload, MessageSquare, Star, CheckCircle } from "lucide-react"

const features = [
    {
        title: "AI Resume Writer",
        description: "Generate professional content for every section of your resume.",
        icon: FileText,
    },
    {
        title: "ATS-Perfect Templates",
        description: "Designed to pass Applicant Tracking Systems with ease.",
        icon: LayoutTemplate,
    },
    {
        title: "LinkedIn Import",
        description: "Import your profile and turn it into a resume in seconds.",
        icon: Upload,
    },
    {
        title: "Conversational Builder",
        description: "Answer simple questions to build your resume effortlessly.",
        icon: MessageSquare,
    },
    {
        title: "AI Review Score",
        description: "Get instant feedback and suggestions to improve your resume.",
        icon: Star,
    },
    {
        title: "PDF & Word Export",
        description: "Download your resume in the format employers prefer.",
        icon: CheckCircle,
    },
]

export function Features() {
    return (
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Features
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Everything you need to build a job-winning resume.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full transition-colors hover:bg-muted/50">
                            <CardHeader>
                                <feature.icon className="h-6 w-6 text-primary mb-2" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
