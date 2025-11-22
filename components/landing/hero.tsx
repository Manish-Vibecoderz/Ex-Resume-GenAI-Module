"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="#"
                        className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                        target="_blank"
                    >
                        Follow along on Twitter
                    </Link>
                </motion.div>
                <motion.h1
                    className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Build your resume with AI.
                    <br />
                    Land your dream job.
                </motion.h1>
                <motion.p
                    className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Exterview helps you create a professional, ATS-friendly resume in minutes.
                    Powered by AI, designed by experts.
                </motion.p>
                <motion.div
                    className="space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/start">
                        <Button size="lg" className="px-8">
                            Get Started Free
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="lg" className="px-8">
                            Learn More
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
