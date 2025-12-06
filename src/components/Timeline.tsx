import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: typeof Briefcase;
  type: "work" | "education" | "achievement";
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2019",
    title: "Computer Science Degree",
    company: "University of Technology",
    description: "Graduated with honors in Computer Science, focusing on web technologies and software engineering.",
    icon: GraduationCap,
    type: "education",
  },
  {
    id: 2,
    year: "2020",
    title: "Junior Developer",
    company: "Tech Startup Inc.",
    description: "Started my professional journey building web applications using React and Node.js.",
    icon: Rocket,
    type: "work",
  },
  {
    id: 3,
    year: "2021",
    title: "Frontend Developer",
    company: "Digital Agency Co.",
    description: "Led frontend development for multiple client projects, improving performance by 40%.",
    icon: Briefcase,
    type: "work",
  },
  {
    id: 4,
    year: "2022",
    title: "Best Developer Award",
    company: "Industry Recognition",
    description: "Recognized for innovative solutions and contributions to open-source projects.",
    icon: Award,
    type: "achievement",
  },
  {
    id: 5,
    year: "2023",
    title: "Senior Full Stack Developer",
    company: "Enterprise Solutions Ltd.",
    description: "Leading a team of developers in building scalable cloud-native applications.",
    icon: Briefcase,
    type: "work",
  },
  {
    id: 6,
    year: "2024",
    title: "Tech Lead",
    company: "Innovation Hub",
    description: "Architecting next-generation solutions and mentoring junior developers.",
    icon: Rocket,
    type: "work",
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "hsl(280, 100%, 70%)";
      case "education":
        return "hsl(190, 100%, 50%)";
      case "achievement":
        return "hsl(50, 100%, 50%)";
      default:
        return "hsl(280, 100%, 70%)";
    }
  };

  return (
    <section id="timeline" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-sm text-primary mb-6">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            The <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A chronicle of my evolution as a developer, from first lines of code to leading teams.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: "linear-gradient(180deg, hsl(280, 100%, 70%), hsl(190, 100%, 50%), hsl(280, 100%, 70%))",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.2 }}
          />

          {/* Events */}
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            const color = getTypeColor(event.type);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Content card */}
                <motion.div
                  className={`w-5/12 ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="glass rounded-2xl p-6 border border-border relative overflow-hidden"
                    style={{
                      boxShadow: hoveredEvent === event.id ? `0 0 30px ${color}30` : 'none',
                    }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      animate={{ opacity: hoveredEvent === event.id ? 0.1 : 0 }}
                      style={{ background: color }}
                    />

                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ 
                        background: `${color}20`,
                        color: color,
                        border: `1px solid ${color}50`,
                      }}
                    >
                      {event.year}
                    </span>
                    <h3 className="text-xl font-orbitron font-bold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-primary text-sm mb-3">{event.company}</p>
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Center icon */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}80)`,
                      boxShadow: `0 0 20px ${color}50`,
                    }}
                  >
                    <event.icon size={20} className="text-background" />
                  </div>
                </motion.div>

                {/* Empty space for other side */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}

          {/* Future indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
            className="text-center pt-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-primary/30"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-sm text-muted-foreground">
                The journey continues...
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
