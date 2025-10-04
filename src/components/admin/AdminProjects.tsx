import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import projectsData from "@/data/projects.json";

export function AdminProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState(projectsData);

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
    toast({
      title: "Saved successfully",
      description: "Projects section has been updated",
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      image: "",
      techStack: [],
      tags: [],
      description: "",
      contribution: 0,
      results: "",
      links: [],
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: string, value: string | number) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={addProject} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Project Entry</h3>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeProject(project.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={project.title}
              onChange={(e) => updateProject(project.id, "title", e.target.value)}
            />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              value={project.image}
              onChange={(e) => updateProject(project.id, "image", e.target.value)}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={project.description}
              onChange={(e) => updateProject(project.id, "description", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Tech Stack (comma-separated)</Label>
              <Input
                value={project.techStack.join(", ")}
                onChange={(e) =>
                  updateProject(
                    project.id,
                    "techStack",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label>Tags (comma-separated)</Label>
              <Input
                value={project.tags.join(", ")}
                onChange={(e) =>
                  updateProject(
                    project.id,
                    "tags",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>
          </div>

          <div>
            <Label>Contribution Level (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={project.contribution}
              onChange={(e) =>
                updateProject(project.id, "contribution", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div>
            <Label>Results & Impact</Label>
            <Textarea
              rows={2}
              value={project.results}
              onChange={(e) => updateProject(project.id, "results", e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button onClick={handleSave} className="w-full">
        Save All Changes
      </Button>
    </div>
  );
}
