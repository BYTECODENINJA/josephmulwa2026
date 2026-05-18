import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Code2,
    Database,
    Server,
    Layers,
    GitBranch,
    Container,
    Cloud,
    Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
    {
        title: "Languages & Frameworks",
        icon: Code2,
        accent: "#ff0033",
        skills: [
            { name: "React.js", level: 92 },
            { name: "Express.js", level: 85 },
            { name: "GSAP", level: 78 },
        ],
    },
    {
        title: "Databases",
        icon: Database,
        accent: "#00f0ff",
        skills: [
            { name: "MongoDB", level: 80 },
            { name: "MySQL", level: 82 },
            { name: "PostgreSQL", level: 85 },
        ],
    },
    {
        title: "DevOps & Tools",
        icon: Server,
        accent: "#ff00ff",
        skills: [
            { name: "Docker", level: 70 },
            { name: "Git", level: 90 },
            { name: "GitHub", level: 88 },
        ],
    },
];

const techStack = [
    { icon: Layers, label: "Frontend" },
    { icon: Server, label: "Backend" },
    { icon: GitBranch, label: "Version Control" },
    { icon: Container, label: "Containerization" },
    { icon: Cloud, label: "Cloud" },
    { icon: Shield, label: "Security" },
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".skill-reveal",
                { y: 50, opacity: 0, filter: "blur(4px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
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
            id="skills"
            className="relative py-32 px-6"
        >
            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="skill-reveal mb-6">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#00f0ff] uppercase">
            Skills
          </span>
                </div>

                <h2 className="skill-reveal font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
                    Technical Arsenal
                </h2>
                <p className="skill-reveal font-body text-[15px] text-[#6e6e73] max-w-lg mb-16">
                    A tactical overview of my development capabilities and the technologies I wield.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-16">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
                            className="skill-reveal apple-card p-6 relative overflow-hidden group"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <category.icon
                                    className="w-4 h-4"
                                    style={{ color: category.accent }}
                                />
                                <span
                                    className="text-[11px] font-medium tracking-[0.15em] uppercase"
                                    style={{ color: category.accent }}
                                >
                  {category.title}
                </span>
                            </div>

                            <div className="space-y-4">
                                {category.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm text-white/90">{skill.name}</span>
                                            <span className="text-[11px] text-[#6e6e73] tabular-nums">
                        {skill.level}%
                      </span>
                                        </div>
                                        <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${skill.level}%`,
                                                    backgroundColor: category.accent,
                                                    opacity: 0.7,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="skill-reveal flex flex-wrap items-center justify-center gap-3">
                    {techStack.map((tech) => (
                        <div
                            key={tech.label}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                        >
                            <tech.icon className="w-3.5 h-3.5 text-[#86868b]" />
                            <span className="text-[11px] font-medium tracking-wider text-[#86868b] uppercase">
                {tech.label}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
