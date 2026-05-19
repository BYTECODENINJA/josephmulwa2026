import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitBranch } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
    title: string;
    description: string;
    tags: string[];
    color: string;
    image: string;
    sourceUrl: string;
    liveUrl: string;
};

const projects: Project[] = [
    {
        title: "AI powered Resume Creator.",
        description: "ResumeFlow is a modern, high-performance resume builder designed to help you create professional, ATS-friendly resumes with ease. Built with React, TypeScript, and Vite, it offers a seamless and interactive user experience.",
        tags: ["React", "Vite", "Typescript", "Supabase"],
        color: "#ff0033",
        image: "../assets/ResumeCreator.png",
        sourceUrl: "https://github.com/BYTECODENINJA/ResumeFlow",
        liveUrl: "https://resume-flow-rosy.vercel.app",
    },
    {
        title: "Expense Tracker",
        description: "MoneyMate is a full-stack personal finance management application that lets you track income and expenses, visualise spending trends, scan receipts with AI, and receive scheduled financial reports — all in one place. Built for Kenya with a clean modern UI.",
        tags: ["TypeScript", "Next.js", "MongoDb", "GenAI"],
        color: "#00f0ff",
        image: "../assets/financetracker.png",
        sourceUrl: "https://github.com/BYTECODENINJA/moneymate",
        liveUrl: "https://moneymate-two.vercel.app",
    },
    {
        title: "Rentals Seeking Website",
        description: "A rentals searching website hosted for kenyan property owners and property seekers to make property finding much easier",
        tags: ["React", "GSAP", "Vite", "Typescript", "Convex"],
        color: "#ff00ff",
        image: "../assets/Rentosearch.png",
        sourceUrl: "https://www.rentosearch.co.ke",
        liveUrl: "https://www.rentosearch.co.ke",
    },
    {
        title: "Windows Style Portfolio",
        description: "A Windows UI-style portfolio website for a fullstack developer. Features a dynamic resume section, blog section, contact form, and more — all in a Windows-inspired design.",
        tags: ["NextJs", "React", "Typescript"],
        color: "#ff0033",
        image: "../assets/Windowsportfolio.png",
        sourceUrl: "https://github.com/BYTECODENINJA/WindowsPortfolio",
        liveUrl: "https://windows-portfolio-ruby.vercel.app",
    },
    {
        title: "Gaming Landing Page",
        description: "A fully animated landing page for a gaming website with a clean and modern design. Features a dynamic navbar, smooth scroll animation, parallax effect, and fully responsive layout.",
        tags: ["Vite", "React", "Javascript", "GSAP"],
        color: "#00f0ff",
        image: "../assets/Gamingwebsite.png",
        sourceUrl: "https://github.com/BYTECODENINJA/gamingwebsite",
        liveUrl: "https://gaminglandingpage.vercel.app",
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".project-reveal",
                { y: 50, opacity: 0, filter: "blur(4px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-32 px-6"
        >
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="project-reveal mb-6">
          <span className="text-base font-medium tracking-[0.2em] text-[#ff0033] uppercase">
            Projects
          </span>
                </div>

                <h2 className="project-reveal font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
                    Featured Work
                </h2>
                <p className="project-reveal font-body text-lg text-[#ddfef8] max-w-lg mb-16">
                    A curated collection of builds. Each represents a unique deployment in my development journey.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="project-reveal group"
                        >
                            <div className="apple-card apple-card-hover overflow-hidden h-full flex flex-col">
                                {/* Card visual */}
                                <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.02]">
                                    <div
                                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(ellipse at center, ${project.color}40, transparent 70%)`,
                                        }}
                                    />
                                    <img
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        className="relative z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-display text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-white/90 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="font-body text-lg text-[#ddfef8] leading-relaxed mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-base font-medium tracking-wider px-2 py-1 rounded-full border border-white/[0.06] text-[#feef4c] bg-white/[0.02]"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
                                        <a
                                            href={project.sourceUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 text-[#6e6e73] hover:text-white transition-colors text-base font-medium tracking-wider uppercase"
                                            aria-label={`View ${project.title} source code`}
                                        >
                                            <GitBranch className="w-3.5 h-3.5" />
                                            Source
                                        </a>
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 text-[#6e6e73] hover:text-white transition-colors text-base font-medium tracking-wider uppercase ml-auto group/btn"
                                            aria-label={`View ${project.title} live project`}
                                        >
                                            Live
                                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>

                                {/* Bottom accent */}
                                <div
                                    className="h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
