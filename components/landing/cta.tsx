import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
    return (
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <div className="rounded-3xl bg-primary px-6 py-16 md:px-16 md:py-24 w-full">
                    <h2 className="font-heading text-3xl leading-[1.1] text-primary-foreground sm:text-3xl md:text-6xl">
                        Ready to build your resume?
                    </h2>
                    <p className="mx-auto mt-6 max-w-[85%] leading-normal text-primary-foreground/80 sm:text-lg sm:leading-7">
                        Join thousands of job seekers who have landed their dream jobs with Exterview.
                    </p>
                    <Link href="/start">
                        <Button size="lg" variant="secondary" className="mt-10 px-8">
                            Get Started Free
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
