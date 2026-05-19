import { useEffect, useRef } from "react";
import { ArrowDown, ChevronRight, FileText, Download } from "lucide-react";
import gsap from "gsap";
import resumeUrl from "../assets/JosephMulwa.pdf";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power3.out" } });

            // Apple-style morph reveal: title chars slide up from below with slight rotation
            tl.fromTo(
                ".hero-char",
                { y: 80, opacity: 0, rotateX: -35, filter: "blur(8px)" },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    filter: "blur(0px)",
                    duration: 1.0,
                    stagger: 0.025,
                    ease: "power3.out",
                }
            )
                .fromTo(
                    badgeRef.current,
                    { y: 20, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
                    "-=0.6"
                )
                .fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0, filter: "blur(6px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
                    "-=0.5"
                )
                .fromTo(
                    ".hero-line",
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
                    "-=0.5"
                )
                .fromTo(
                    ctaRef.current?.children || [],
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollTo = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const nameChars = "Joseph Mulwa".split("");
    const subtitleChars = "Fullstack Developer".split("");

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        >
            <div className="absolute inset-0 gradient-mesh" />

            <div className="relative z-10 text-center max-w-6xl mx-auto">
                {/* Status badge */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] mb-10 opacity-0"
                >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0033] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff0033]" />
          </span>
                    <span className="text-base font-medium tracking-widest text-[#86868b] uppercase">
            Available for hire
          </span>
                </div>

                {/* Name with morph animation */}
                <h1
                    ref={titleRef}
                    className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 tracking-tight"
                    style={{ perspective: "1200px" }}
                >
                    {nameChars.map((char, i) => (
                        <span
                            key={i}
                            className="hero-char inline-block"
                            style={{ transformStyle: "preserve-3d" }}
                        >
              {char === " " ? "\u00A0" : char}
            </span>
                    ))}
                </h1>

                <div className="hero-line h-px w-24 mx-auto bg-white/10 mb-6 origin-center" />

                {/* Subtitle with subtle morph */}
                <p
                    ref={subtitleRef}
                    className="font-body text-lg sm:text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-4 leading-relaxed tracking-tight opacity-0"
                    style={{ perspective: "800px" }}
                >
                    {subtitleChars.map((char, i) => (
                        <span
                            key={i}
                            className="hero-char inline-block"
                            style={{ transformStyle: "preserve-3d" }}
                        >
              {char === " " ? "\u00A0" : char}
            </span>
                    ))}
                </p>

                <p className="font-body text-base text-[#6e6e73] mb-12">
                    Computer Science — The Co-operative University of Kenya
                </p>

                {/* CTA Buttons — minimal Apple style */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-hire-modal"))}
                        className="group px-8 py-3.5 bg-white text-black font-medium text-base rounded-full hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
                    >
                        <span>Hire Me</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        onClick={() => scrollTo("#about")}
                        className="px-8 py-3.5 border border-white/10 text-white/80 font-medium text-base rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                        Know More About Me
                    </button>
                </div>

                {/* Secondary Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-base">
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View Joseph Mulwa resume in a new browser tab"
                        className="flex min-h-11 items-center justify-center gap-2 text-[#86868b] hover:text-white transition-colors duration-300 group"
                    >
                        <FileText className="w-4 h-4 group-hover:scale-105 transition-transform" />
                        <span className="text-base tracking-wider uppercase">View Resume</span>
                    </a>
                    <div className="hidden sm:block w-px h-3 bg-white/10" />
                    <a
                        href={resumeUrl}
                        download="Joseph-Mulwa-Resume.pdf"
                        aria-label="Download Joseph Mulwa resume as a PDF"
                        className="flex min-h-11 items-center justify-center gap-2 text-[#86868b] hover:text-white transition-colors duration-300 group"
                    >
                        <Download className="w-4 h-4 group-hover:scale-105 transition-transform" />
                        <span className="text-base tracking-wider uppercase">Download</span>
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float-slow">
        <span className="text-base tracking-widest text-[#6e6e73] uppercase">
          Scroll
        </span>
                <ArrowDown className="w-4 h-4 text-[#6e6e73]" />
            </div>
        </section>
    );
}
