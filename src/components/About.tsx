import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Terminal, Cpu, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Code2, label: "Languages", value: "JS / TS / Python" },
    { icon: Terminal, label: "Stacks", value: "MERN / PERN" },
    { icon: Cpu, label: "Focus", value: "Fullstack" },
    { icon: GraduationCap, label: "Education", value: "Co-op Uni KE" },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".about-reveal",
                { y: 40, opacity: 0, filter: "blur(6px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
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
            id="about"
            className="relative min-h-[80vh] flex items-center py-32 px-6"
        >
            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="about-reveal mb-6">
          <span className="text-base font-medium tracking-[0.2em] text-[#ff0033] uppercase">
            About
          </span>
                </div>

                <h2 className="about-reveal font-display text-3xl sm:text-4xl md:text-5xl text-white mb-12 tracking-tight leading-tight max-w-3xl">
                    Bridging clean code with reliable DevOps pipelines.
                </h2>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 xl:gap-24 items-start">
                    <div className="space-y-6">
                        <p className="about-reveal font-body text-xl text-[#86868b] leading-relaxed">
                            I&apos;m{" "}
                            <span className="text-white font-medium">Joseph Mulwa</span> — a
                            creative fullstack engineer passionate about building digital
                            experiences that merge clean code with reliable infrastructure.
                        </p>
                        <p className="about-reveal font-body text-lg text-[#6e6e73] leading-relaxed">
                            My academic foundation in Computer Science from{" "}
                            <span className="text-[#86868b]">
                The Co-operative University of Kenya
              </span>{" "}
                            equips me with theoretical depth, while hands-on experience in
                            modern web technologies keeps me grounded in practical execution.
                        </p>
                        <p className="about-reveal font-body text-lg text-[#6e6e73] leading-relaxed">
                            From architecting robust API layers to orchestrating Docker
                            containers and CI/CD pipelines. Every challenge is approached
                            with precision and creative flair.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="about-reveal apple-card apple-card-hover p-5 group"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <stat.icon className="w-5 h-5 text-[#ff0033] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="text-base font-medium tracking-[0.15em] text-[#6e6e73] uppercase mb-1.5">
                                    {stat.label}
                                </div>
                                <div className="text-base font-medium text-white tracking-tight">
                                    {stat.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
