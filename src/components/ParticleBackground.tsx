import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const drawStar = (star: Star, time: number) => {
      const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
      const opacity = star.opacity * twinkle;

      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.size * 3
      );
      gradient.addColorStop(0, `hsla(280, 100%, 70%, ${opacity})`);
      gradient.addColorStop(0.5, `hsla(190, 100%, 50%, ${opacity * 0.5})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core of the star
      ctx.beginPath();
      ctx.fillStyle = `hsla(0, 0%, 100%, ${opacity})`;
      ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines near mouse
      starsRef.current.forEach((star) => {
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `hsla(280, 100%, 70%, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      // Draw stars
      starsRef.current.forEach((star) => {
        drawStar(star, time);

        // Subtle parallax based on mouse
        const parallaxX = (mouseRef.current.x - canvas.width / 2) * 0.01;
        const parallaxY = (mouseRef.current.y - canvas.height / 2) * 0.01;
        star.x += parallaxX * star.speed * 0.1;
        star.y += parallaxY * star.speed * 0.1;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    initStars();
    animate(0);

    window.addEventListener("resize", () => {
      resizeCanvas();
      initStars();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      {/* Gradient overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-background/50 to-background" />
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, hsl(280 100% 70% / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, hsl(190 100% 50% / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, hsl(280 100% 70% / 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
    </>
  );
};

export default ParticleBackground;
