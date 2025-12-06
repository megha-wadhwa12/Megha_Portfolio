import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools";
  color: string;
}

const skills: Skill[] = [
  { name: "React", level: 95, category: "frontend", color: "hsl(190, 100%, 50%)" },
  { name: "TypeScript", level: 90, category: "frontend", color: "hsl(220, 100%, 60%)" },
  { name: "Next.js", level: 85, category: "frontend", color: "hsl(0, 0%, 80%)" },
  { name: "Tailwind", level: 95, category: "frontend", color: "hsl(190, 100%, 50%)" },
  { name: "Node.js", level: 88, category: "backend", color: "hsl(120, 50%, 50%)" },
  { name: "Python", level: 80, category: "backend", color: "hsl(50, 100%, 50%)" },
  { name: "PostgreSQL", level: 85, category: "backend", color: "hsl(220, 60%, 50%)" },
  { name: "MongoDB", level: 82, category: "backend", color: "hsl(120, 40%, 45%)" },
  { name: "Docker", level: 78, category: "tools", color: "hsl(200, 100%, 50%)" },
  { name: "AWS", level: 75, category: "tools", color: "hsl(35, 100%, 50%)" },
  { name: "Git", level: 92, category: "tools", color: "hsl(10, 100%, 50%)" },
  { name: "Figma", level: 70, category: "tools", color: "hsl(280, 100%, 70%)" },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "tools">("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools" },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-sm text-primary mb-6">
            My Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Skill <span className="text-gradient">Constellation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each skill is a star in my development universe, interconnected and growing brighter with experience.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Constellation */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {filteredSkills.map((skill, i) => 
              filteredSkills.slice(i + 1).map((otherSkill, j) => {
                if (Math.random() > 0.7) return null;
                const startX = (i % 4) * 25 + 12.5;
                const startY = Math.floor(i / 4) * 33 + 16;
                const endX = ((i + j + 1) % 4) * 25 + 12.5;
                const endY = Math.floor((i + j + 1) / 4) * 33 + 16;
                const isActive = hoveredSkill === skill.name || hoveredSkill === otherSkill.name;
                
                return (
                  <motion.line
                    key={`${skill.name}-${otherSkill.name}`}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke={isActive ? "hsl(280, 100%, 70%)" : "hsl(222, 47%, 20%)"}
                    strokeWidth={isActive ? 2 : 1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: isActive ? 0.8 : 0.3 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                );
              })
            )}
          </svg>

          {/* Skill Nodes */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative group"
              >
                <motion.div
                  className="relative z-10 glass rounded-2xl p-6 text-center border border-border hover:border-primary/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: `0 0 30px ${skill.color}40`,
                  }}
                >
                  {/* Skill icon/initial */}
                  <motion.div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
                      border: `2px solid ${skill.color}60`,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.name.slice(0, 2)}
                    
                    {/* Orbiting dot */}
                    <motion.div
                      className="absolute w-2 h-2 rounded-full"
                      style={{ background: skill.color }}
                      animate={{ 
                        rotate: 360,
                        x: [0, 30, 0, -30, 0],
                        y: [-30, 0, 30, 0, -30],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>

                  <h3 className="font-semibold text-foreground mb-2">{skill.name}</h3>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${skill.color}, hsl(280, 100%, 70%))` }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                  
                  <motion.span
                    className="text-xs text-muted-foreground mt-2 block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {skill.level}%
                  </motion.span>
                </motion.div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                  style={{ background: `${skill.color}30` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
