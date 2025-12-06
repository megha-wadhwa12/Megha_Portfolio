import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Rocket, Lightbulb, Coffee } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Code, value: "50+", label: "Projects Completed" },
    { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
    { icon: Rocket, value: "5+", label: "Years Experience" },
    { icon: Lightbulb, value: "100%", label: "Dedication" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - Image/Avatar */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Orbiting rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-secondary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Avatar placeholder */}
              <div className="absolute inset-12 rounded-full overflow-hidden border-2 border-primary/50 glow-purple">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl font-orbitron font-bold text-gradient">
                    AC
                  </span>
                </div>
              </div>

              {/* Floating elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-primary/50"
                  style={{
                    top: `${20 + i * 30}%`,
                    left: i % 2 === 0 ? "0%" : "90%",
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={itemVariants}>
            <motion.span
              className="inline-block px-4 py-2 rounded-full border border-primary/30 text-sm text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              About Me
            </motion.span>

            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Navigating the{" "}
              <span className="text-gradient">Digital Cosmos</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Hello! I'm a passionate full-stack developer with a love for creating
                immersive digital experiences. My journey in the coding universe
                started 5 years ago, and I've been exploring new technologies ever
                since.
              </p>
              <p>
                I specialize in building scalable web applications using modern
                technologies like React, TypeScript, Node.js, and cloud services.
                I believe in writing clean, maintainable code that stands the test
                of time.
              </p>
              <p>
                When I'm not coding, you can find me exploring new tech trends,
                contributing to open-source projects, or enjoying a good cup of
                coffee while brainstorming my next project.
              </p>
            </div>

            {/* Download CV Button */}
            <motion.button
              className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-6 text-center border-glow"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="text-primary" size={24} />
              </motion.div>
              <motion.h3
                className="text-3xl font-orbitron font-bold text-gradient mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
