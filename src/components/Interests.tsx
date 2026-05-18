import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Wifi,
    Shield,
    Gamepad2,
    Brain,
    Cloud,
    CircuitBoard,
    Lock,
    Cpu,
    Zap,
    Globe,
    Network,
    Bot,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const interests = [
    {
        title: "IoT",
        icon: Wifi,
        description: "Smart device ecosystems and sensor networks bridging physical and digital worlds.",
        size: "large",
        color: "#ff0033",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        title: "Cybersecurity",
        icon: Shield,
        description: "Defensive protocols and penetration testing.",
        size: "small",
        color: "#00f0ff",
        gridClass: "md:col-span-1",
    },
    {
        title: "Gaming Tech",
        icon: Gamepad2,
        description: "High-performance game engines and rendering pipelines.",
        size: "medium",
        color: "#ff00ff",
        gridClass: "md:col-span-1",
    },
    {
        title: "AI & ML",
        icon: Brain,
        description: "Neural architectures and predictive models driving next-gen automation.",
        size: "large",
        color: "#ff0033",
        gridClass: "md:col-span-2",
    },
    {
        title: "Cloud Computing",
        icon: Cloud,
        description: "Scalable distributed systems and serverless architectures.",
        size: "medium",
        color: "#00f0ff",
        gridClass: "md:col-span-1",
    },
];

const floatingIcons = [
    { icon: CircuitBoard, pos: "top-8 left-12" },
    { icon: Lock, pos: "top-16 right-20" },
    { icon: Cpu, pos: "bottom-20 left-16" },
    { icon: Zap, pos: "bottom-12 right-12" },
    { icon: Globe, pos: "top-1/2 left-8" },
    { icon: Network, pos: "top-1/3 right-8" },
    { icon: Bot, pos: "bottom-1/3 left-20" },
];

export default function Interests() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".bento-reveal",
                { y: 50, opacity: 0, scale: 0.97 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.08,
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
            id="interests"
            className="relative py-32 px-6 overflow-hidden"
        >
            {/* Floating background icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingIcons.map((item, i) => (
                    <div
                        key={i}
                        className={`absolute ${item.pos} opacity-[0.02] animate-float-slow`}
                        style={{ animationDelay: `${i * 0.5}s` }}
                    >
                        <item.icon className="w-20 h-20 text-white" />
                    </div>
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="bento-reveal mb-6">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#ff00ff] uppercase">
            Interests
          </span>
                </div>

                <h2 className="bento-reveal font-display text-3xl sm:text-4xl md:text-5xl text-white mb-16 tracking-tight">
                    Areas of Interest
                </h2>

                <div className="grid md:grid-cols-4 gap-3 auto-rows-[160px]">
                    {interests.map((item) => (
                        <div
                            key={item.title}
                            className={`bento-reveal group relative overflow-hidden apple-card apple-card-hover ${item.gridClass}`}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${item.color}, transparent 70%)`,
                                }}
                            />

                            <div className="relative z-10 p-6 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <item.icon
                                        className="w-5 h-5 transition-colors duration-300"
                                        style={{ color: item.color }}
                                    />
                                    <span
                                        className="text-[10px] font-medium tracking-wider opacity-30 uppercase"
                                        style={{ color: item.color }}
                                    >
                    {item.size}
                  </span>
                                </div>

                                <h3 className="font-display text-base font-semibold text-white mb-2 tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="font-body text-[13px] text-[#86868b] leading-relaxed flex-1">
                                    {item.description}
                                </p>

                                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="h-px flex-1" style={{ backgroundColor: `${item.color}25` }} />
                                    <span className="text-[10px] font-medium tracking-wider uppercase" style={{ color: item.color }}>
                    Explore
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
