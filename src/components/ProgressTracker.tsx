import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProgressTracker = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Journey" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Determine active section
      const sectionElements = sections.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4"
    >
      {/* Progress line */}
      <div className="relative h-40 w-0.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: `${scrollProgress}%`,
            background: "linear-gradient(180deg, hsl(var(--neon-purple)), hsl(var(--neon-cyan)))",
            boxShadow: "0 0 10px hsl(var(--neon-purple) / 0.5)",
          }}
        />
      </div>

      {/* Section dots */}
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary glow-purple"
                  : "bg-muted hover:bg-primary/50"
              }`}
            />
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-foreground whitespace-nowrap bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Progress percentage */}
      <motion.div
        className="text-xs text-muted-foreground font-orbitron"
        animate={{ opacity: scrollProgress > 5 ? 1 : 0 }}
      >
        {Math.round(scrollProgress)}%
      </motion.div>
    </motion.div>
  );
};

export default ProgressTracker;
