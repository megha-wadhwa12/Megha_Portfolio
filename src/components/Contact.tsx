import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@alexchen.dev" },
    { icon: MapPin, label: "Location", value: "San Francisco, CA" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  ];

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-sm text-primary mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Mission <span className="text-gradient">Control</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to launch your next project? Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-orbitron font-bold mb-8">
              Let's Connect
            </h3>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  className="flex items-center gap-4 p-4 glass rounded-2xl border border-border hover:border-primary/50 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <motion.div
              className="relative h-48 rounded-2xl overflow-hidden glass border border-border"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary/30" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-secondary/30" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-transparent text-foreground placeholder:text-muted-foreground"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-transparent text-foreground placeholder:text-muted-foreground"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-transparent text-foreground placeholder:text-muted-foreground"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-transparent text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 rounded-xl font-semibold text-lg relative overflow-hidden group disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, hsl(280, 100%, 70%), hsl(190, 100%, 50%))",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="relative z-10 flex items-center justify-center gap-2 text-primary-foreground"
                  animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Launch Message
                    </>
                  )}
                </motion.span>

                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                )}

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-secondary/30"
                  initial={{ scale: 0, opacity: 1 }}
                  whileTap={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "inherit" }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
