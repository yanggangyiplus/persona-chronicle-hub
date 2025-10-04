import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import awardsData from "@/data/awards.json";

export function AdminAwards() {
  const { toast } = useToast();
  const [awards, setAwards] = useState(awardsData);

  useEffect(() => {
    const saved = localStorage.getItem("awards");
    if (saved) {
      setAwards(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("awards", JSON.stringify(awards));
    toast({
      title: "Saved successfully",
      description: "Awards section has been updated",
    });
  };

  const addAward = () => {
    const newAward = {
      id: Date.now().toString(),
      title: "",
      period: "",
      institution: "",
      description: "",
      category: "certification",
    };
    setAwards([...awards, newAward]);
  };

  const removeAward = (id: string) => {
    setAwards(awards.filter((a) => a.id !== id));
  };

  const updateAward = (id: string, field: string, value: string | number) => {
    setAwards(awards.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Awards & Certifications</h2>
        <Button onClick={addAward} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Award
        </Button>
      </div>

      {awards.map((award) => (
        <div key={award.id} className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Award Entry</h3>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeAward(award.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={award.title}
              onChange={(e) => updateAward(award.id, "title", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Institution</Label>
              <Input
                value={award.institution}
                onChange={(e) => updateAward(award.id, "institution", e.target.value)}
              />
            </div>

            <div>
              <Label>Period</Label>
              <Input
                value={award.period}
                onChange={(e) => updateAward(award.id, "period", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={award.category}
              onValueChange={(value) => updateAward(award.id, "category", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="award">Award</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={award.description}
              onChange={(e) => updateAward(award.id, "description", e.target.value)}
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
