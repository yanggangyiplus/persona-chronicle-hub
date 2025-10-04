import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import aboutData from "@/data/about.json";

export function AdminAbout() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(aboutData);

  useEffect(() => {
    const saved = localStorage.getItem("about");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("about", JSON.stringify(formData));
    toast({
      title: "Saved successfully",
      description: "About section has been updated",
    });
  };

  return (
    <div className="glass-panel rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold">About Information</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="phrase">Tagline</Label>
          <Input
            id="phrase"
            value={formData.phrase}
            onChange={(e) => setFormData({ ...formData, phrase: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="bio">Biography</Label>
          <Textarea
            id="bio"
            rows={5}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.contact.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value },
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.contact.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value },
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.contact.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, location: e.target.value },
                })
              }
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
