import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminButton, setShowAdminButton] = useState(false);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount === 5) {
      setShowAdminButton(true);
    }
  };

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen">
        <Navigation onLogoClick={handleLogoClick} showAdminButton={showAdminButton} />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Awards />
        <Contact />
      </div>
    </>
  );
};

export default Index;
