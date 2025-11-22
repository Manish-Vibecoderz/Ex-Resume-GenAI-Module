"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User, Wand2, Download } from "lucide-react"

const steps = [
    {
        title: "Choose your mode",
        description: "Start from scratch or upload your existing resume.",
        icon: User,
    },
    {
        title: "Build with AI",
        description: "Let our AI write and refine your content for you.",
        icon: Wand2,
    },
    {
        title: "Review & Download",
        description: "Get an AI score and download as PDF or Word.",
        icon: Download,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    How it works
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Create a standout resume in three simple steps.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full relative overflow-hidden border-none shadow-none bg-background/50">
                            <CardHeader>
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <step.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {step.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
