import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitBranch } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "01",
        title: "AI powered Resume Creator.",
        description: "ResumeFlow is a modern, high-performance resume builder designed to help you create professional, ATS-friendly resumes with ease. Built with React, TypeScript, and Vite, it offers a seamless and interactive user experience.",
        tags: ["React", "Vite", "Typescript", "Supabase"],
        color: "#ff0033",
    },
    {
        id: "02",
        title: "Task Orchestrator",
        description: "Kanban-style project management tool with drag-and-drop, real-time sync, and team workspaces.",
        tags: ["TypeScript", "Next.js", "PostgreSQL", "WebSockets"],
        color: "#00f0ff",
    },
    {
        id: "03",
        title: "DevOps Monitor",
        description: "Container monitoring dashboard with Docker metrics, log aggregation, and alerting rules.",
        tags: ["React", "Docker", "Grafana", "Prometheus"],
        color: "#ff00ff",
    },
    {
        id: "04",
        title: "Chatbot Engine",
        description: "AI-powered conversational interface with NLP pipeline, context memory, and multi-turn dialogue.",
        tags: ["Python", "FastAPI", "OpenAI", "Redis"],
        color: "#ff0033",
    },
    {
        id: "05",
        title: "Portfolio CMS",
        description: "Headless content management system for creative portfolios with dynamic page builder.",
        tags: ["Next.js", "Sanity", "Tailwind", "Vercel"],
        color: "#00f0ff",
    },
    {
        id: "06",
        title: "API Gateway",
        description: "Microservices API gateway with rate limiting, JWT auth, and request/response transformation.",
        tags: ["Node.js", "Express", "JWT", "Redis"],
        color: "#ff00ff",
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
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#ff0033] uppercase">
            Projects
          </span>
                </div>

                <h2 className="project-reveal font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
                    Featured Work
                </h2>
                <p className="project-reveal font-body text-[15px] text-[#ddfef8] max-w-lg mb-16">
                    A curated collection of builds. Each represents a unique deployment in my development journey.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-reveal group"
                        >
                            <div className="apple-card apple-card-hover overflow-hidden h-full flex flex-col">
                                {/* Card visual */}
                                <div className="relative h-36 overflow-hidden bg-white/[0.02]">
                                    <div
                                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(ellipse at center, ${project.color}40, transparent 70%)`,
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-16 h-16 rounded-2xl border border-white/[0.06] flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                                            style={{ borderColor: `${project.color}20` }}
                                        >
                      <span
                          className="font-display text-xl font-bold tracking-tighter"
                          style={{ color: `${project.color}80` }}
                      >
                        {project.id}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-display text-sm font-semibold text-white mb-2 tracking-tight group-hover:text-white/90 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="font-body text-[15px] text-[#ddfef8] leading-relaxed mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[12px] font-medium tracking-wider px-2 py-1 rounded-full border border-white/[0.06] text-[#feef4c] bg-white/[0.02]"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
                                        <button className="flex items-center gap-1.5 text-[#6e6e73] hover:text-white transition-colors text-[11px] font-medium tracking-wider uppercase">
                                            <GitBranch className="w-3.5 h-3.5" />
                                            Source
                                        </button>
                                        <button className="flex items-center gap-1.5 text-[#6e6e73] hover:text-white transition-colors text-[11px] font-medium tracking-wider uppercase ml-auto group/btn">
                                            Live
                                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </button>
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
