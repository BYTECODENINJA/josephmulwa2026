import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./components/Navigation";
import Scene3D from "./components/Scene3D";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import TechJourney from "./components/TechJourney";
import Interests from "./components/Interests";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import HireMeModal from "./components/HireMeModal";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />

          {/* Persistent 3D Canvas Background */}
          <Scene3D />

          {/* Navigation */}
          <Navigation />

          {/* DOM Content */}
          <div className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <TechJourney />
            <Interests />
            <Projects />
            <Contact />
            <Footer />
          </div>

          {/* Global Hire Me Modal */}
          <HireMeModal />
        </TooltipProvider>
      </QueryClientProvider>
  );
}

export default App;
