import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Building2,
    Briefcase,
    Mail,
    Phone,
    MapPin,
    DollarSign,
    Clock,
    FileText,
    Layers,
    User,
    Send,
    ChevronRight,
} from "lucide-react";

const budgetRanges = [
    "KSh 50,000 - 100,000",
    "KSh 100,000 - 250,000",
    "KSh 250,000 - 500,000",
    "KSh 500,000 - 1,000,000",
    "KSh 1,000,000+",
    "Negotiable",
];

const employmentTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Remote"];
const workLocations = ["On-site", "Remote", "Hybrid"];
const projectTypes = [
    "Web Application",
    "Mobile App",
    "API / Backend",
    "DevOps / Infrastructure",
    "UI/UX Design",
    "Fullstack Solution",
    "Other",
];

export default function HireMeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<"employment" | "project">("employment");

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-hire-modal", handleOpen);
        return () => window.removeEventListener("open-hire-modal", handleOpen);
    }, []);

    const handleClose = useCallback(() => setIsOpen(false), []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 28, stiffness: 350 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto apple-card"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/[0.04] bg-[#0a0a0a]/80 backdrop-blur-xl">
                            <div>
                                <h2 className="font-display text-lg font-semibold text-white tracking-tight">
                                    Hire Me
                                </h2>
                                <p className="font-body text-base text-[#6e6e73] mt-0.5">
                                    Let&apos;s build something extraordinary together.
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                            >
                                <X className="w-4 h-4 text-[#86868b] hover:text-white" />
                            </button>
                        </div>

                        {/* Mode Toggle */}
                        <div className="p-6 pb-0">
                            <div className="flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                                <button
                                    onClick={() => setMode("employment")}
                                    className={`flex-1 py-2.5 px-4 text-base font-medium tracking-tight rounded-lg transition-all duration-300 ${
                                        mode === "employment"
                                            ? "bg-white/[0.08] text-white"
                                            : "text-[#86868b] hover:text-white"
                                    }`}
                                >
                                    Long-term / Employment
                                </button>
                                <button
                                    onClick={() => setMode("project")}
                                    className={`flex-1 py-2.5 px-4 text-base font-medium tracking-tight rounded-lg transition-all duration-300 ${
                                        mode === "project"
                                            ? "bg-white/[0.08] text-white"
                                            : "text-[#86868b] hover:text-white"
                                    }`}
                                >
                                    Project-Based
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-5">
                            {mode === "employment" ? <EmploymentForm /> : <ProjectForm />}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function InputGroup({
                        label,
                        icon: Icon,
                        children,
                    }: {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-base font-medium tracking-[0.1em] text-[#6e6e73] uppercase">
                <Icon className="w-3 h-3" />
                {label}
            </label>
            {children}
        </div>
    );
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-base placeholder:text-[#6e6e73]/50 focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all"
        />
    );
}

function StyledSelect(props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
    const { options, ...rest } = props;
    return (
        <select
            {...rest}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-base focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all appearance-none"
        >
            <option value="" className="bg-[#111111]">Select...</option>
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111111]">
                    {opt}
                </option>
            ))}
        </select>
    );
}

function StyledTextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white font-body text-base placeholder:text-[#6e6e73]/50 focus:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-white/[0.08] transition-all resize-none"
        />
    );
}

function EmploymentForm() {
    return (
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
                <InputGroup label="Employer / Company" icon={Building2}>
                    <StyledInput placeholder="Company name" />
                </InputGroup>
                <InputGroup label="Role Hiring For" icon={Briefcase}>
                    <StyledInput placeholder="e.g. Senior Fullstack Developer" />
                </InputGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <InputGroup label="Email" icon={Mail}>
                    <StyledInput type="email" placeholder="hr@company.com" />
                </InputGroup>
                <InputGroup label="Contact" icon={Phone}>
                    <StyledInput placeholder="Phone number" />
                </InputGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <InputGroup label="Employment Type" icon={Layers}>
                    <StyledSelect options={employmentTypes} />
                </InputGroup>
                <InputGroup label="Work Location" icon={MapPin}>
                    <StyledSelect options={workLocations} />
                </InputGroup>
            </div>

            <InputGroup label="Job Description" icon={FileText}>
                <StyledTextArea rows={4} placeholder="Describe the role, responsibilities, and expectations..." />
            </InputGroup>

            <InputGroup label="Required Skills" icon={Layers}>
                <StyledInput placeholder="e.g. React, Node.js, Docker, AWS" />
            </InputGroup>

            <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-medium text-base rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group"
            >
                Submit Application
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </form>
    );
}

function ProjectForm() {
    return (
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
                <InputGroup label="Client Name" icon={User}>
                    <StyledInput placeholder="Your name" />
                </InputGroup>
                <InputGroup label="Company (Optional)" icon={Building2}>
                    <StyledInput placeholder="Company name" />
                </InputGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <InputGroup label="Email" icon={Mail}>
                    <StyledInput type="email" placeholder="you@email.com" />
                </InputGroup>
                <InputGroup label="Contact" icon={Phone}>
                    <StyledInput placeholder="Phone number" />
                </InputGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <InputGroup label="Project Type" icon={Layers}>
                    <StyledSelect options={projectTypes} />
                </InputGroup>
                <InputGroup label="Budget Range (KSh)" icon={DollarSign}>
                    <StyledSelect options={budgetRanges} />
                </InputGroup>
            </div>

            <InputGroup label="Project Timeline" icon={Clock}>
                <StyledInput placeholder="e.g. 2-3 weeks, 1-2 months" />
            </InputGroup>

            <InputGroup label="Project Description" icon={FileText}>
                <StyledTextArea rows={4} placeholder="Describe your project, goals, and any specific requirements..." />
            </InputGroup>

            <InputGroup label="Preferred Tech Stack" icon={Layers}>
                <StyledInput placeholder="e.g. React + Node.js + PostgreSQL" />
            </InputGroup>

            <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-medium text-base rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group"
            >
                Send Project Request
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </form>
    );
}
