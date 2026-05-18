import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Tech Journey", href: "#tech-journey" },
    { label: "Interests", href: "#interests" },
    { label: "Projects", href: "#projects" },
    { label: "Contacts", href: "#contact" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.04]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <a
                    href="#hero"
                    onClick={() => scrollTo("#hero")}
                    className="font-display text-lg tracking-tight text-white hover:opacity-80 transition-opacity"
                >
                    J.Mulwa
                </a>

                <div className="hidden md:flex items-center gap-5">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => scrollTo(item.href)}
                            className="text-sm text-[#86868b] hover:text-white transition-colors duration-300 relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-hire-modal"))}
                        className="text-sm px-5 py-2 bg-white/[0.06] text-white rounded-full border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300"
                    >
                        Hire Me
                    </button>
                </div>

                <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/[0.04] px-6 py-8">
                    <div className="flex flex-col gap-5">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => scrollTo(item.href)}
                                className="text-left text-base text-[#86868b] hover:text-white transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                setMenuOpen(false);
                                window.dispatchEvent(new CustomEvent("open-hire-modal"));
                            }}
                            className="text-sm px-5 py-3 bg-white/[0.06] text-white rounded-full border border-white/[0.08] hover:bg-white/[0.1] transition-all mt-2"
                        >
                            Hire Me
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
