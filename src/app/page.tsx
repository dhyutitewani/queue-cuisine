import Image from "next/image";
import Dashboard from "@/components/ui/Dashboard/Dashboard"

export default function Home() {
    return (
        <div>
            <main className="flex-grow p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <Dashboard />
            </main>
            <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center p-2 pb-10 gap-16 font-[family-name:var(--font-geist-sans)]">
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/file.svg"
                            alt="File icon"
                            width={16}
                            height={16}
                        />
                        Contact Us
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/window.svg"
                            alt="Window icon"
                            width={16}
                            height={16}
                        />
                        Follow Us
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://maps.app.goo.gl/7KwLpNa4ZKgEegmr5"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/globe.svg"
                            alt="Globe icon"
                            width={16}
                            height={16}
                        />
                        Location
                    </a>
                </footer>
            </div>
        </div>
    );
}
