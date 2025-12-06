import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail particle
      setTrail((prev) => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Clean up old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-10));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: particle.x - 3,
            top: particle.y - 3,
            width: 6,
            height: 6,
            background: `linear-gradient(135deg, hsl(280 100% 70%), hsl(190 100% 50%))`,
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            backgroundColor: isHovering
              ? "hsl(190 100% 50%)"
              : "hsl(280 100% 70%)",
          }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 rounded-full"
          style={{
            boxShadow: isHovering
              ? "0 0 20px hsl(190 100% 50% / 0.8), 0 0 40px hsl(190 100% 50% / 0.5)"
              : "0 0 20px hsl(280 100% 70% / 0.8), 0 0 40px hsl(280 100% 70% / 0.5)",
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border-2 border-primary/50"
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
        }}
        transition={{ duration: 0.2 }}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default CustomCursor;
