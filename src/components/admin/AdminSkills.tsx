import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import skillsData from "@/data/skills.json";

export function AdminSkills() {
  const { toast } = useToast();
  const [skillCategories, setSkillCategories] = useState(skillsData);

  useEffect(() => {
    const saved = localStorage.getItem("skills");
    if (saved) {
      setSkillCategories(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("skills", JSON.stringify(skillCategories));
    toast({
      title: "Saved successfully",
      description: "Skills section has been updated",
    });
  };

  const addCategory = () => {
    setSkillCategories([
      ...skillCategories,
      { category: "New Category", skills: [] },
    ]);
  };

  const removeCategory = (index: number) => {
    setSkillCategories(skillCategories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, value: string) => {
    setSkillCategories(
      skillCategories.map((cat, i) => (i === index ? { ...cat, category: value } : cat))
    );
  };

  const addSkill = (catIndex: number) => {
    setSkillCategories(
      skillCategories.map((cat, i) =>
        i === catIndex
          ? { ...cat, skills: [...cat.skills, { name: "", level: 50 }] }
          : cat
      )
    );
  };

  const updateSkill = (
    catIndex: number,
    skillIndex: number,
    field: string,
    value: string | number
  ) => {
    setSkillCategories(
      skillCategories.map((cat, i) =>
        i === catIndex
          ? {
            ...cat,
            skills: cat.skills.map((skill, si) =>
              si === skillIndex ? { ...skill, [field]: value } : skill
            ),
          }
          : cat
      )
    );
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    setSkillCategories(
      skillCategories.map((cat, i) =>
        i === catIndex
          ? { ...cat, skills: cat.skills.filter((_, si) => si !== skillIndex) }
          : cat
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button onClick={addCategory} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {skillCategories.map((category, catIndex) => (
        <div key={catIndex} className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Input
              value={category.category}
              onChange={(e) => updateCategory(catIndex, e.target.value)}
              className="font-semibold"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeCategory(catIndex)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {category.skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className="flex items-center gap-3 p-3 bg-background rounded-lg"
              >
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(catIndex, skillIndex, "name", e.target.value)
                  }
                  placeholder="Skill name"
                  className="flex-1"
                />
                <div className="flex items-center gap-3 flex-1">
                  <Slider
                    value={[skill.level]}
                    onValueChange={([value]) =>
                      updateSkill(catIndex, skillIndex, "level", value)
                    }
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {skill.level}%
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(catIndex, skillIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => addSkill(catIndex)}
            className="w-full"
          >
            + Add Skill
          </Button>
        </div>
      ))}

      <Button onClick={handleSave} className="w-full">
        Save All Changes
      </Button>
    </div>
  );
}
