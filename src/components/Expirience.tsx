import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Code, Database, Server, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: "01",
        title: "UI/UX Design",
        icon: Palette,
        description:
            "Crafting gamer-centric, premium interfaces with tactical precision. Every pixel serves a purpose in the user journey.",
        tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
        color: "#ff0033",
    },
    {
        id: "02",
        title: "Frontend & Backend",
        icon: Code,
        description:
            "Building robust API layers and microservices alongside immersive, responsive frontends. Fullstack mastery from database to DOM.",
        tags: ["REST APIs", "GraphQL", "Microservices", "WebSockets"],
        color: "#00f0ff",
    },
    {
        id: "03",
        title: "Database & Hosting",
        icon: Database,
        description:
            "Architecting secure database structures and server environments. Optimized queries, replication, and backup strategies.",
        tags: ["PostgreSQL", "MongoDB", "AWS", "Vercel"],
        color: "#ff00ff",
    },
    {
        id: "04",
        title: "DevOps Pipelines",
        icon: Server,
        description:
            "Orchestrating CI/CD workflows and containerized deployments. Infrastructure as code for scalable, reliable delivery.",
        tags: ["Docker", "GitHub Actions", "Kubernetes", "Monitoring"],
        color: "#ff0033",
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".exp-reveal",
                { y: 40, opacity: 0, filter: "blur(4px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.15,
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
            id="experience"
            className="relative py-32 px-6"
        >
            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="exp-reveal mb-6">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#ff0033] uppercase">
            Experience
          </span>
                </div>

                <h2 className="exp-reveal font-display text-3xl sm:text-4xl md:text-5xl text-white mb-16 tracking-tight">
                    Capability Matrix
                </h2>

                <div className="space-y-3">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="exp-reveal group"
                        >
                            <div className="apple-card apple-card-hover p-6 md:p-7 flex flex-col md:flex-row gap-6">
                                <div className="flex items-start gap-4 md:w-48 shrink-0">
                  <span
                      className="font-display text-3xl font-bold opacity-20 group-hover:opacity-40 transition-opacity tracking-tighter"
                      style={{ color: exp.color }}
                  >
                    {exp.id}
                  </span>
                                    <div
                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.06]"
                                        style={{ borderColor: `${exp.color}20` }}
                                    >
                                        <exp.icon className="w-4 h-4" style={{ color: exp.color }} />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-display text-base font-semibold text-white tracking-tight">
                                            {exp.title}
                                        </h3>
                                        <ArrowRight className="w-4 h-4 text-[#6e6e73] group-hover:text-white group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                                    </div>
                                    <p className="font-body text-sm text-[#86868b] leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-medium tracking-wider px-2.5 py-1 rounded-full border border-white/[0.06] text-[#6e6e73] bg-white/[0.02]"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
