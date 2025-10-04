import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Code2 } from "lucide-react";

const sections = ["home", "about", "experience", "skills", "projects", "awards", "contact"];

interface NavigationProps {
  onLogoClick: () => void;
  showAdminButton: boolean;
}

export function Navigation({ onLogoClick, showAdminButton }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass-panel border-b"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            aria-label="Logo"
          >
            <Code2 className="h-6 w-6" />
            <span>Portfolio</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-colors relative ${
                  activeSection === section
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {showAdminButton && (
              <a
                href="/admin"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Admin
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
