import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Container, Database, GitBranch, Rocket, Route, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const journey = [
    {
        phase: "Foundation",
        title: "Frontend Systems",
        description: "Building responsive interfaces with React.js, component thinking, and motion-led product polish.",
        icon: Code2,
        tags: ["React.js", "GSAP", "UI Architecture"],
        color: "#ff0033",
    },
    {
        phase: "Expansion",
        title: "Backend Engineering",
        description: "Designing Express.js APIs that connect clean business logic with secure, practical data flows.",
        icon: Route,
        tags: ["Express.js", "REST APIs", "Node.js"],
        color: "#00f0ff",
    },
    {
        phase: "Persistence",
        title: "Database Craft",
        description: "Working across document and relational storage with MongoDB, MySQL, and PostgreSQL.",
        icon: Database,
        tags: ["MongoDB", "MySQL", "PostgreSQL"],
        color: "#ff00ff",
    },
    {
        phase: "Delivery",
        title: "Shipping Workflow",
        description: "Keeping projects versioned, container-ready, and easier to hand off with Git, GitHub, and Docker.",
        icon: Container,
        tags: ["Docker", "Git", "GitHub"],
        color: "#ff0033",
    },
];

export default function TechJourney() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".journey-reveal",
                { y: 44, opacity: 0, filter: "blur(4px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.75,
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
        <section ref={sectionRef} id="tech-journey" className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="journey-reveal mb-6">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[#00f0ff] uppercase">
                        Tech Journey
                    </span>
                </div>

                <div className="journey-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
                            From Interface to Infrastructure
                        </h2>
                        <p className="font-body text-[15px] text-[#6e6e73] max-w-xl">
                            A practical path through the tools I use to plan, build, persist, and ship web products.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
                        <Rocket className="w-3.5 h-3.5 text-[#ff0033]" />
                        <span className="text-[11px] font-medium tracking-wider text-[#86868b] uppercase">
                            Build Pipeline
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    {journey.map((item, index) => (
                        <div key={item.title} className="journey-reveal group relative">
                            <div className="apple-card apple-card-hover p-5 h-full overflow-hidden">
                                <div
                                    className="absolute inset-x-6 top-0 h-px opacity-70"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex items-center justify-between mb-8">
                                    <div
                                        className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center"
                                        style={{ borderColor: `${item.color}24` }}
                                    >
                                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                                    </div>
                                    <span className="font-display text-2xl font-bold text-white/10 tabular-nums">
                                        0{index + 1}
                                    </span>
                                </div>

                                <span className="text-[10px] font-medium tracking-[0.16em] uppercase" style={{ color: item.color }}>
                                    {item.phase}
                                </span>
                                <h3 className="font-display text-base font-semibold text-white mt-2 mb-3 tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="font-body text-[13px] text-[#86868b] leading-relaxed mb-5">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-medium tracking-wider px-2 py-1 rounded-full border border-white/[0.06] text-[#6e6e73] bg-white/[0.02]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="journey-reveal mt-6 flex items-center justify-center gap-2 text-[#6e6e73]">
                    <GitBranch className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span className="font-body text-[12px] tracking-wider uppercase">Versioned, containerized, and ready to iterate</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#ff0033]" />
                </div>
            </div>
        </section>
    );
}
