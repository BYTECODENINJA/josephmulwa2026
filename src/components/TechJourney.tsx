import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Calendar, Code2, GitBranch, MapPin, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const roles = [
    {
        position: "Software Developer Attachee",
        organisation: "Makueni Tech and Innovation Hub",
        period: "23 FEB - 15 May",
        location: "Makueni, Kenya",
        summary:
            "Contributed to software development work inside the hub environment, supporting practical builds, improving user-facing interfaces, and strengthening development workflows through Git-based collaboration.",
        highlights: [
            "Built and refined responsive web interfaces with React-style component thinking.",
            "Supported backend and database learning workflows around APIs, data persistence, and application structure.",
            "Practiced collaborative delivery using Git, GitHub, documentation, and iterative review.",
        ],
        stack: ["React.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "Git", "GitHub"],
        color: "#00f0ff",
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
                    stagger: 0.12,
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
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="journey-reveal mb-6">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[#00f0ff] uppercase">
                        Tech Journey
                    </span>
                </div>

                <div className="journey-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
                    <div>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
                            Work Experience Timeline
                        </h2>
                        <p className="font-body text-[15px] text-[#6e6e73] max-w-2xl">
                            A timeline of the places I have worked, what I contributed, and the technologies I practiced along the way.
                        </p>
                    </div>
                    <div className="flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
                        <GitBranch className="w-3.5 h-3.5 text-[#ff0033]" />
                        <span className="text-[11px] font-medium tracking-wider text-[#86868b] uppercase">
                            Career Path
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-10 md:space-y-14">
                        {roles.map((role, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div key={`${role.position}-${role.organisation}`} className="journey-reveal relative md:grid md:grid-cols-[1fr_72px_1fr] md:items-stretch">
                                    <div className={isLeft ? "md:col-start-1" : "md:col-start-3"}>
                                        <article className="apple-card apple-card-hover ml-12 p-6 md:ml-0 md:p-7 relative overflow-hidden">
                                            <div
                                                className="absolute inset-x-7 top-0 h-px opacity-70"
                                                style={{ backgroundColor: role.color }}
                                            />

                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Code2 className="w-4 h-4" style={{ color: role.color }} />
                                                        <span className="text-[10px] font-medium tracking-[0.16em] uppercase" style={{ color: role.color }}>
                                                            Position
                                                        </span>
                                                    </div>
                                                    <h3 className="font-display text-xl text-white tracking-tight">
                                                        {role.position}
                                                    </h3>
                                                </div>

                                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium tracking-wider text-[#86868b] uppercase">
                                                    <Calendar className="w-3.5 h-3.5 text-[#ff0033]" />
                                                    {role.period}
                                                </span>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-3 mb-6">
                                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Building2 className="w-3.5 h-3.5 text-[#ff00ff]" />
                                                        <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-[#6e6e73]">
                                                            Organisation
                                                        </span>
                                                    </div>
                                                    <p className="font-body text-sm text-white/90">{role.organisation}</p>
                                                </div>
                                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                                                        <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-[#6e6e73]">
                                                            Location
                                                        </span>
                                                    </div>
                                                    <p className="font-body text-sm text-white/90">{role.location}</p>
                                                </div>
                                            </div>

                                            <p className="font-body text-sm text-[#86868b] leading-relaxed mb-5">
                                                {role.summary}
                                            </p>

                                            <div className="space-y-3 mb-6">
                                                {role.highlights.map((item) => (
                                                    <div key={item} className="flex gap-3">
                                                        <Server className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00f0ff]" />
                                                        <p className="font-body text-[13px] leading-relaxed text-[#86868b]">
                                                            {item}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {role.stack.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="text-[10px] font-medium tracking-wider px-2.5 py-1 rounded-full border border-white/[0.06] text-[#6e6e73] bg-white/[0.02]"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </article>
                                    </div>

                                    <div className="absolute left-4 top-8 -translate-x-1/2 md:static md:col-start-2 md:flex md:items-start md:justify-center md:translate-x-0">
                                        <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black shadow-[0_0_0_8px_rgba(0,0,0,0.75)]">
                                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: role.color }} />
                                        </div>
                                    </div>

                                    <div className={isLeft ? "hidden md:block md:col-start-3" : "hidden md:block md:col-start-1"} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
