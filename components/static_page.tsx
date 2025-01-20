"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share2, Star, Trophy } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface Resolution {
  id: string;
  name: string;
  user_id: string;
  description: string;
  likes: number;
  category: string;
  rating: number;
  ratingCount: number;
  progress: number;
}

interface Likes {
  [key: string]: boolean;
}

export default function StaticPage() {
  const [users, setUsers] = useState<any>([]);
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [likes, setLikes] = useState<Likes>({});

  const fetchResolutions = async (): Promise<Resolution[]> => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.from("resolution").select("*");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching resolutions:", error);
      return [];
    }
  };
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    // Fetch resolutions from API
    fetchUsers();
    fetchResolutions().then((data: Resolution[]) => {
      setResolutions(data);
    });
  }, []);

  const handleLike = (id: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          return {
            ...resolution,
            likes: resolution.likes
              ? resolution.likes - 1
              : resolution.likes + 1,
            isLiked: !resolution.likes,
          };
        }
        return resolution;
      }),
    );
  };

  const handleRate = (id: any, rating: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          const newRatingCount = resolution.ratingCount + 1;
          const newRating =
            (Number(resolution.rating) * resolution.ratingCount + rating) /
            newRatingCount;
          return {
            ...resolution,
            rating: newRating,
            ratingCount: newRatingCount,
          };
        }
        return resolution;
      }),
    );
  };

  const StarRating = ({ rating, onRate }: any) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 h-screen my-6 ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
        Community Resolutions
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {resolutions.map((resolution) => (
          <Card key={resolution.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                <div className="flex items-center gap-3">
                  {users.map((user: any) => {
                    if (user.id === resolution.user_id) {
                      return (
                        <div key={user.id} className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm sm:text-base">
                            {user.email}
                          </span>
                        </div>
                      );
                    }
                  })}

                  <div>
                    <Badge variant="secondary">{resolution.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {resolution.rating} ({resolution.ratingCount})
                  </span>
                  <StarRating
                    rating={resolution.rating}
                    onRate={(rating: any) => handleRate(resolution.id, rating)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                {resolution.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {resolution.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{resolution.progress}%</span>
                </div>
                <Progress value={resolution.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-800">
              <div className="flex items-center justify-between sm:justify-start sm:gap-4 w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(resolution.id)}
                  className={`gap-1 sm:gap-2 ${resolution.likes ? "text-red-500" : ""}`}
                >
                  <Heart
                    className={`w-4 h-4 ${resolution.likes ? "fill-current" : ""}`}
                  />
                  {resolution.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {/* {resolution.comments} */}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
