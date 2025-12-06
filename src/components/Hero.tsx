import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center z-10"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-sm text-muted-foreground backdrop-blur-sm">
            Welcome to my universe
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold mb-6"
        >
          <span className="text-foreground">I'm </span>
          <span className="text-gradient glow-text">Alex Chen</span>
        </motion.h1>

        {/* Title with typing effect */}
        <motion.div variants={itemVariants} className="mb-8">
          <TypeWriter
            words={[
              "Full Stack Developer",
              "UI/UX Enthusiast",
              "Problem Solver",
              "Code Constellation Navigator",
            ]}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12"
        >
          Crafting digital experiences that push boundaries. I transform ideas into
          elegant, performant code that brings visions to life.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full border-2 border-primary/50 text-foreground font-semibold text-lg hover:border-primary hover:glow-purple transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary hover:glow-purple text-muted-foreground hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Local Time */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-24 left-6 hidden lg:block"
        >
          <p className="text-xs text-muted-foreground mb-1">Local Time</p>
          <p className="font-orbitron text-sm text-foreground">
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
        </motion.div>

        {/* Available Status */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-24 right-6 hidden lg:flex items-center gap-2"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground">Available for work</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
};

// TypeWriter component
const TypeWriter = ({ words }: { words: string[] }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className="h-12 flex items-center justify-center">
      <span className="text-2xl md:text-3xl font-space text-secondary">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1 w-0.5 h-8 bg-secondary inline-block"
      />
    </div>
  );
};

export default Hero;
