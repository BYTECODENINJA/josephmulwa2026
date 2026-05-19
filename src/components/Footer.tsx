import { useState, useEffect } from "react";
import {
    X,
    GitBranch,
    Link,
    Mail,
    Activity,
    ArrowUp,
    Zap,
    Code2,
} from "lucide-react";

const socialLinks = [
    { icon: GitBranch, label: "GitHub", href: "https://github.com/BYTECODENINJA" },
    { icon: X, label: "Twitter", href: "#" },
    { icon: Link, label: "LinkedIn", href: "https://linkedin.com/in/joseph-mulwa808" },
    { icon: Mail, label: "Email", href: "josephmulwa8055@gmail.com
];

const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Tech Journey", href: "#tech-journey" },
    { label: "Interests", href: "#interests" },
    { label: "Projects", href: "#projects" },
    { label: "Contacts", href: "#contact" },
    { label: "Hire Me", action: () => window.dispatchEvent(new CustomEvent("open-hire-modal")) },
];

function ServerStatus() {
    const [ping, setPing] = useState(24);

    useEffect(() => {
        const interval = setInterval(() => {
            setPing(Math.floor(Math.random() * 15) + 18);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
            <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </div>
            <span className="text-base font-medium tracking-wider text-[#6e6e73]">
        <span className="text-green-400">ONLINE</span>
        <span className="mx-2 opacity-40">|</span>
        <span className="tabular-nums">{ping}ms</span>
      </span>
        </div>
    );
}

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-white/[0.04]">
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#ff0033]" />
                            <span className="font-display text-base tracking-tight text-white">
                J.Mulwa
              </span>
                        </div>
                        <p className="font-body text-base text-[#6e6e73] leading-relaxed max-w-xs">
                            Fullstack Developer & DevOps enthusiast crafting digital
                            experiences with precision and creative flair.
                        </p>
                        <ServerStatus />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base font-medium tracking-[0.15em] text-[#6e6e73] uppercase mb-6">
                            Navigation
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    {link.href ? (
                                        <a
                                            href={link.href}
                                            className="font-body text-base text-[#86868b] hover:text-white transition-colors duration-300"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={link.action}
                                            className="font-body text-base text-[#86868b] hover:text-white transition-colors duration-300"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-base font-medium tracking-[0.15em] text-[#6e6e73] uppercase mb-6">
                            Connect
                        </h4>
                        <div className="flex gap-2 mb-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center text-[#86868b] hover:text-white hover:border-white/[0.12] transition-all duration-300 bg-white/[0.02]"
                                >
                                    <social.icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                        <div className="space-y-2 text-base text-[#6e6e73]">
                            <div className="flex items-center gap-2">
                                <Code2 className="w-3.5 h-3.5 text-[#00f0ff] opacity-60" />
                                <span className="font-body">TypeScript & React</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-3.5 h-3.5 text-[#ff00ff] opacity-60" />
                                <span className="font-body">Always shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body text-base text-[#6e6e73]">
                        &copy; {new Date().getFullYear()} Joseph Mulwa. All systems nominal.
                    </p>

                    <div className="flex items-center gap-4">
            <span className="text-base font-medium tracking-widest text-[#6e6e73] uppercase">
              Built with Vite + React
            </span>
                        <button
                            onClick={scrollToTop}
                            className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center text-[#86868b] hover:text-white hover:border-white/[0.12] transition-all bg-white/[0.02]"
                        >
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
