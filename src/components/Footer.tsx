import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const footerLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="font-orbitron text-xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            {"<DEV />"}
          </motion.a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-8 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Alex Chen. Crafted with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={14} className="text-primary fill-primary" />
            </motion.span>{" "}
            and lots of code.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
