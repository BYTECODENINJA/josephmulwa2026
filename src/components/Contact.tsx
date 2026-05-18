import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactCards = [
    { icon: Mail, label: "Email", value: "joseph@example.com", href: "mailto:joseph@example.com", color: "#ff0033" },
    { icon: Phone, label: "Phone", value: "+254 700 000 000", href: "tel:+254700000000", color: "#00f0ff" },
    { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: "#contact", color: "#ff00ff" },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-reveal",
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
        <section ref={sectionRef} id="contact" className="relative py-32 px-6">
            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="contact-reveal mb-6">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[#ff0033] uppercase">
                        Contacts
                    </span>
                </div>

                <div className="grid lg:grid-cols-[1fr_1.15fr] gap-5">
                    <div className="contact-reveal apple-card p-7 md:p-8 flex flex-col justify-between min-h-[420px] overflow-hidden relative">
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                background:
                                    "radial-gradient(ellipse at 20% 20%, #ff0033, transparent 45%), radial-gradient(ellipse at 85% 80%, #00f0ff, transparent 42%)",
                            }}
                        />
                        <div className="relative z-10">
                            <div className="w-11 h-11 rounded-2xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center mb-8">
                                <MessageSquare className="w-5 h-5 text-[#ff0033]" />
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4 tracking-tight">
                                Let&apos;s Build the Next System
                            </h2>
                            <p className="font-body text-[15px] text-[#86868b] leading-relaxed max-w-md">
                                Open to fullstack roles, freelance builds, backend systems, and clean portfolio-grade web experiences.
                            </p>
                        </div>

                        <div className="relative z-10 grid gap-3 mt-10">
                            {contactCards.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
                                >
                                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                                    <div>
                                        <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-[#6e6e73]">
                                            {item.label}
                                        </p>
                                        <p className="font-body text-[13px] text-white/90">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <form className="contact-reveal apple-card p-6 md:p-7 space-y-5" onSubmit={(event) => event.preventDefault()}>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="space-y-2">
                                <span className="text-[11px] font-medium tracking-[0.14em] text-[#6e6e73] uppercase">Name</span>
                                <input
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-[13px] placeholder:text-[#6e6e73]/50 focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all"
                                    placeholder="Your name"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-[11px] font-medium tracking-[0.14em] text-[#6e6e73] uppercase">Email</span>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-[13px] placeholder:text-[#6e6e73]/50 focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all"
                                    placeholder="you@email.com"
                                />
                            </label>
                        </div>

                        <label className="block space-y-2">
                            <span className="text-[11px] font-medium tracking-[0.14em] text-[#6e6e73] uppercase">Project Type</span>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-[13px] placeholder:text-[#6e6e73]/50 focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all"
                                placeholder="Fullstack app, API, portfolio, DevOps setup..."
                            />
                        </label>

                        <label className="block space-y-2">
                            <span className="text-[11px] font-medium tracking-[0.14em] text-[#6e6e73] uppercase">Message</span>
                            <textarea
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-[13px] placeholder:text-[#6e6e73]/50 focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all resize-none"
                                placeholder="Tell me what you want to build..."
                            />
                        </label>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-medium text-black hover:bg-white/90 transition-colors group"
                            >
                                Send Message
                                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <div className="flex items-center gap-2 text-[#6e6e73]">
                                <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                                <span className="text-[11px] font-medium tracking-wider uppercase">Usually replies within 24 hours</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
