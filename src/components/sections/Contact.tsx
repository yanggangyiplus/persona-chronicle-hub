import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { Github, Linkedin, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import contactData from "@/data/contact.json";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    toast({
      title: "Email copied!",
      description: "Email address has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Github,
    Linkedin,
    Globe,
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Let's discuss your next project
          </p>

          <div className="glass-panel rounded-2xl p-8 md:p-12">
            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Email</div>
                  <div className="text-sm text-muted-foreground">{contactData.email}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Phone</div>
                  <div className="text-sm text-muted-foreground">{contactData.phone}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Location</div>
                  <div className="text-sm text-muted-foreground">{contactData.location}</div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href={`https://open.kakao.com/o/${contactData.kakaoTalk}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-lg font-medium hover:bg-[#FEE500]/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                KakaoTalk
              </a>

              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>

              <Button
                onClick={copyEmail}
                variant="outline"
                className="inline-flex items-center gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy Email
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="text-sm font-medium mb-4">Connect with me</div>
              <div className="flex flex-wrap gap-4">
                {contactData.socials.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-panel rounded-lg hover:bg-accent/10 transition-colors text-sm"
                    >
                      <Icon className="h-4 w-4" />
                      {social.platform}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 text-sm text-muted-foreground"
          >
            <p>© 2025 Portfolio. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
