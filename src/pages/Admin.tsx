import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminAbout } from "@/components/admin/AdminAbout";
import { AdminExperience } from "@/components/admin/AdminExperience";
import { AdminSkills } from "@/components/admin/AdminSkills";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminAwards } from "@/components/admin/AdminAwards";

const Admin = () => {
  const { toast } = useToast();

  const downloadAllData = () => {
    const data = {
      profile: localStorage.getItem("profile") || "{}",
      about: localStorage.getItem("about") || "{}",
      experience: localStorage.getItem("experience") || "[]",
      skills: localStorage.getItem("skills") || "[]",
      projects: localStorage.getItem("projects") || "[]",
      awards: localStorage.getItem("awards") || "[]",
      contact: localStorage.getItem("contact") || "{}",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your portfolio data is being downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b glass-panel sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <div className="flex gap-3">
              <Button onClick={downloadAllData} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download JSON
              </Button>
              <Button asChild className="gap-2">
                <a href="/">
                  <Home className="h-4 w-4" />
                  Back to Portfolio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <AdminAbout />
          </TabsContent>

          <TabsContent value="experience">
            <AdminExperience />
          </TabsContent>

          <TabsContent value="skills">
            <AdminSkills />
          </TabsContent>

          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>

          <TabsContent value="awards">
            <AdminAwards />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
