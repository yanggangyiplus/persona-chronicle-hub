import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutData from "@/data/about.json";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            {aboutData.phrase}
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="glass-panel rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">{aboutData.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {aboutData.bio}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium min-w-20">Email:</span>
                  <span className="text-muted-foreground">{aboutData.contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium min-w-20">Phone:</span>
                  <span className="text-muted-foreground">{aboutData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium min-w-20">Location:</span>
                  <span className="text-muted-foreground">{aboutData.contact.location}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {aboutData.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-panel rounded-xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
