import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import experienceData from "@/data/experience.json";

export function AdminExperience() {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState(experienceData);

  useEffect(() => {
    const saved = localStorage.getItem("experience");
    if (saved) {
      setExperiences(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("experience", JSON.stringify(experiences));
    toast({
      title: "Saved successfully",
      description: "Experience section has been updated",
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      period: "",
      responsibilities: [""],
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((r, i) =>
                i === index ? value : r
              ),
            }
          : exp
      )
    );
  };

  const addResponsibility = (expId: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: [...exp.responsibilities, ""] }
          : exp
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Experience</h2>
        <Button onClick={addExperience} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Experience Entry</h3>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Period</Label>
            <Input
              value={exp.period}
              onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
            />
          </div>

          <div>
            <Label>Responsibilities</Label>
            {exp.responsibilities.map((resp, index) => (
              <Input
                key={index}
                className="mt-2"
                value={resp}
                onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => addResponsibility(exp.id)}
            >
              + Add Responsibility
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={handleSave} className="w-full">
        Save All Changes
      </Button>
    </div>
  );
}
