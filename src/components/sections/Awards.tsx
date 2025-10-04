import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Medal } from "lucide-react";
import awardsData from "@/data/awards.json";

const categoryIcons = {
  award: Medal,
  certification: Award,
  training: BookOpen,
};

const categoryColors = {
  award: "text-yellow-500",
  certification: "text-blue-500",
  training: "text-green-500",
};

export function Awards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="awards" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Awards & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Recognition and professional development
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {awardsData.map((award, index) => {
              const Icon = categoryIcons[award.category as keyof typeof categoryIcons];
              const colorClass = categoryColors[award.category as keyof typeof categoryColors];

              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-panel rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-card rounded-lg ${colorClass}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{award.title}</h3>
                      <div className="text-sm text-primary font-medium mb-1">
                        {award.institution}
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        {award.period}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
