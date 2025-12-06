import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A real-time analytics dashboard with interactive data visualization and AI-powered insights.",
    image: "linear-gradient(135deg, hsl(280, 100%, 40%), hsl(220, 100%, 50%))",
    tags: ["React", "TypeScript", "D3.js", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#",
    color: "hsl(280, 100%, 70%)",
  },
  {
    id: 2,
    title: "Stellar Commerce",
    description: "Full-stack e-commerce platform with headless CMS, payment integration, and inventory management.",
    image: "linear-gradient(135deg, hsl(190, 100%, 40%), hsl(280, 100%, 50%))",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    color: "hsl(190, 100%, 50%)",
  },
  {
    id: 3,
    title: "Quantum Chat",
    description: "Encrypted real-time messaging app with end-to-end encryption and file sharing capabilities.",
    image: "linear-gradient(135deg, hsl(330, 100%, 50%), hsl(280, 100%, 60%))",
    tags: ["React Native", "Firebase", "WebRTC", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    color: "hsl(330, 100%, 65%)",
  },
  {
    id: 4,
    title: "Cosmos AI",
    description: "AI-powered content generation tool using advanced language models and creative algorithms.",
    image: "linear-gradient(135deg, hsl(50, 100%, 50%), hsl(30, 100%, 50%))",
    tags: ["Python", "OpenAI", "FastAPI", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    color: "hsl(50, 100%, 50%)",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-sm text-primary mb-6">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Project <span className="text-gradient">Planets</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each project is a world of its own, crafted with passion and precision.
          </p>
        </motion.div>

        {/* 3D Planet Cards */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation arrows */}
          <motion.button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border border-border hover:border-primary transition-colors"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border border-border hover:border-primary transition-colors"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Projects carousel */}
          <div className="flex items-center justify-center perspective-1000 py-12">
            {projects.map((project, index) => {
              const offset = index - activeProject;
              const isActive = index === activeProject;
              
              return (
                <motion.div
                  key={project.id}
                  className={`absolute w-full max-w-lg ${isActive ? 'z-10' : 'z-0'}`}
                  animate={{
                    x: offset * 400,
                    scale: isActive ? 1 : 0.8,
                    rotateY: offset * -15,
                    opacity: Math.abs(offset) > 1 ? 0 : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.div
                    className="glass rounded-3xl overflow-hidden border border-border"
                    style={{
                      boxShadow: isActive ? `0 0 60px ${project.color}30` : 'none',
                    }}
                    whileHover={isActive ? { scale: 1.02 } : {}}
                  >
                    {/* Project image/gradient */}
                    <div 
                      className="h-64 relative overflow-hidden"
                      style={{ background: project.image }}
                    >
                      {/* Floating orbs */}
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute w-20 h-20 rounded-full opacity-50"
                            style={{ background: project.color }}
                            animate={{
                              x: [0, 30, 0],
                              y: [0, -20, 0],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute right-10 bottom-10 w-12 h-12 rounded-full opacity-30"
                            style={{ background: 'white' }}
                            animate={{
                              x: [0, -20, 0],
                              y: [0, 20, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                        </>
                      )}

                      {/* Planet ring overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={isActive && isHovering ? { rotateX: 20 } : { rotateX: 0 }}
                      >
                        <div 
                          className="w-40 h-40 rounded-full border-4 opacity-30"
                          style={{ 
                            borderColor: project.color,
                            transform: 'rotateX(70deg)',
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-orbitron font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground font-medium text-sm hover:border-primary transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={16} />
                          Source
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeProject
                    ? "bg-primary glow-purple"
                    : "bg-muted hover:bg-primary/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
