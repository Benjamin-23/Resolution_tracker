"use client";
import { Heart, InfoIcon, Share2, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Progress } from "./ui/progress";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
export default function Resolution() {
  const supabase = createClient();
  const [resolutions, setResolutions] = useState<any[]>([]);

  const [newResolution, setNewResolution] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal Growth");
  const [newDescription, setNewDescription] = useState("");
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
  // Helper function to check for repetitive patterns and return the repeated pattern
  const findRepetitivePattern = (str: any) => {
    if (!str) return null;

    const text = str.toLowerCase();

    // Check for repeating characters first
    const repeatingCharsRegex = /(.)\1{3,}/;
    const repeatingCharsMatch = text.match(repeatingCharsRegex);
    if (repeatingCharsMatch) {
      return {
        pattern: repeatingCharsMatch[1],
        type: "character",
      };
    }

    // Check for repeating patterns
    for (
      let patternLength = 2;
      patternLength <= Math.floor(text.length / 3);
      patternLength++
    ) {
      for (let i = 0; i <= text.length - patternLength; i++) {
        const pattern = text.slice(i, i + patternLength);
        const regex = new RegExp(pattern, "g");
        const matches = text.match(regex);
        if (matches && matches.length >= 3) {
          return {
            pattern: pattern,
            type: "pattern",
          };
        }
      }
    }

    return null;
  };

  const addResolution = async () => {
    const trimmedResolution = newResolution.trim();
    const trimmedDescription = newDescription.trim();

    if (!trimmedResolution || !trimmedDescription) {
      toast({
        title: "Error",
        description: "Resolution and description are required",
        variant: "destructive",
      });
      return;
    }

    // Check resolution for repetitive patterns
    const resolutionRepetition = findRepetitivePattern(trimmedResolution);
    if (resolutionRepetition) {
      toast({
        title: "Repetitive Content Detected",
        description:
          resolutionRepetition.type === "character"
            ? `The character "${resolutionRepetition.pattern}" is repeated too many times in the resolution`
            : `The pattern "${resolutionRepetition.pattern}" is repeated too many times in the resolution`,
        variant: "destructive",
      });
      return;
    }

    // Check description for repetitive patterns
    const descriptionRepetition = findRepetitivePattern(trimmedDescription);
    if (descriptionRepetition) {
      toast({
        title: "Repetitive Content Detected",
        description:
          descriptionRepetition.type === "character"
            ? `The character "${descriptionRepetition.pattern}" is repeated too many times in the description`
            : `The pattern "${descriptionRepetition.pattern}" is repeated too many times in the description`,
        variant: "destructive",
      });
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("resolution").insert([
        {
          name: trimmedResolution,
          description: trimmedDescription,
          category: selectedCategory,
          progress: 0,
          likes: 0,
          coins: 0,
          user_id: user?.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Resolution created successfully",
        variant: "default",
      });

      fetchResolutions();
      setNewResolution("");
      setNewDescription("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resolution",
        variant: "destructive",
      });
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
    fetchResolutions();
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-2 sm:p-6">
        {/* <Toaster /> */}
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
              <Input
                value={newDescription}
                placeholder="Enter your resolution description..."
                onChange={(e) => setNewDescription(e.target.value)}
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
