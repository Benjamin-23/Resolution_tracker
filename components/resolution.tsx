"use client";
import { Heart, InfoIcon, Share2, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Progress } from "./ui/progress";
export default function Resolution() {
  const supabase = createClient();
  const [resolutions, setResolutions] = useState<any[]>([]);

  const [newResolution, setNewResolution] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal Growth");

  const categories = [
    "Personal Growth",
    "Health",
    "Career",
    "Community",
    "Environment",
  ];
  useEffect(() => {
    fetchResolutions();
  }, []);
  const fetchResolutions = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("resolution")
      .select("*")
      .eq("user_id", user?.id);
    if (error) {
      console.error("Error fetching resolutions", error);
    } else {
      setResolutions(data);
    }
  };
  const addResolution = async () => {
    if (newResolution.trim()) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      await supabase.from("resolution").insert([
        {
          name: newResolution,
          category: selectedCategory,
          progress: 0,
          likes: 0,
          coins: 0,
          user_id: user?.id,
        },
      ]);
      fetchResolutions();
      setNewResolution("");
    }
  };

  const updateProgress = async (id: number, increment: number) => {
    const updatedProgress = resolutions.map((resolution) => {
      if (resolution.id === id) {
        const newProgress = Math.max(
          0,
          Math.min(100, resolution.progress + increment),
        );
        return { ...resolution, progress: newProgress };
      }
      return resolution;
    });

    setResolutions(updatedProgress);

    const { error } = await supabase
      .from("resolution")
      .update({ progress: updatedProgress.find((r) => r.id === id)?.progress })
      .eq("id", id);

    if (error) {
      console.error("Error updating progress:", error);
    }
  };

  const incrementLikes = async (id: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          return { ...resolution, likes: resolution.likes + 1 };
        }
        return resolution;
      }),
    );
    // Check if resolution has already been liked by this user
    const resolvedResolution = resolutions.find((r) => r.id === id);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (resolvedResolution?.usersLiked?.includes(userId)) {
      return;
    }
    const { error } = await supabase
      .from("resolution")
      .update({ likes: resolutions.find((r) => r.id === id)?.likes + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error updating likes:", error);
    }
  };

  const incrementInspired = (id: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          return { ...resolution, inspired: resolution.inspired + 1 };
        }
        return resolution;
      }),
    );
  };
  const deleteResolution = async (id: number) => {
    const { error } = await supabase.from("resolution").delete().eq("id", id);

    if (error) {
      console.error("Error deleting resolution:", error);
    } else {
      setResolutions(resolutions.filter((resolution) => resolution.id !== id));
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-2 sm:p-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />
              Resolution Revolution Challenge 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
              <Input
                value={newResolution}
                onChange={(e) => setNewResolution(e.target.value)}
                placeholder="Enter your resolution..."
                className="flex-grow"
              />
              <select
                className="px-3 py-2 border rounded-md w-full sm:w-auto"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button onClick={addResolution} className="w-full sm:w-auto">
                Add Resolution
              </Button>
            </div>

            <div className="space-y-4">
              {resolutions.map((resolution) => (
                <Card key={resolution.id} className="p-2 sm:p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                    <div>
                      <h3 className="font-medium text-base sm:text-lg">
                        {resolution.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {resolution.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => incrementLikes(resolution.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {resolution.likes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => incrementInspired(resolution.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Trophy className="w-4 h-4 mr-1" />
                        {resolution.coins}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={resolution.progress} className="w-full" />
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProgress(resolution.id, 10)}
                          className="flex-1"
                        >
                          +10%
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProgress(resolution.id, 50)}
                          className="flex-1"
                        >
                          +50%
                        </Button>
                      </div>
                      <span className="text-sm text-gray-500 text-center sm:text-right">
                        Progress: {resolution.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between pt-2 gap-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(resolution.id, 100)}
                        className="flex-1"
                      >
                        Done
                      </Button>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteResolution(resolution.id)}
                        className="flex-1 sm:flex-none"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
