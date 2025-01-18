"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Resolution {
  id: string;
  name: string;
  user_id: string;
  description: string;
  likes: number;
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

  const handleRating = async (resolutionId: string, rating: number) => {
    const supabase = createClient();
    setUserRating(rating);

    try {
      // Save the user's rating
      await supabase.from("ratings").insert({
        resolution_id: resolutionId,
        user_email: users[0]?.email,
        rating: rating,
      });

      // Get all ratings for this resolution
      const { data: ratingData, error } = await supabase
        .from("ratings")
        .select("rating")
        .eq("resolution_id", resolutionId);

      if (error) throw error;

      // Calculate average rating
      if (ratingData && ratingData.length > 0) {
        const totalRating = ratingData.reduce(
          (sum, curr) => sum + curr.rating,
          0,
        );
        const averageRating = totalRating / ratingData.length;

        // Update resolution with new average rating
        await supabase
          .from("resolution")
          .update({ average_rating: averageRating })
          .eq("id", resolutionId);
      }
    } catch (error) {
      console.error("Error handling rating:", error);
    }
  };

  const handleLike = async (resolutionId: string) => {
    const supabase = createClient();

    // Check if user has already liked this resolution
    const { data: existingLike } = await supabase
      .from("likes")
      .select("*")
      .eq("resolution_id", resolutionId)
      .eq("user_email", users[0]?.email)
      .single();

    if (existingLike) {
      // Unlike - delete the like record
      await supabase
        .from("likes")
        .delete()
        .eq("resolution_id", resolutionId)
        .eq("user_email", users[0]?.email);

      setLikes((prev: Likes) => ({
        ...prev,
        [resolutionId]: false,
      }));

      try {
        const { error } = await supabase
          .from("resolution")
          .update({
            likes: resolutions.find((r) => r.id === resolutionId)!.likes - 1,
          })
          .eq("id", resolutionId);

        if (error) throw error;

        setResolutions((prevResolutions) =>
          prevResolutions.map((res) =>
            res.id === resolutionId
              ? {
                  ...res,
                  likes: res.likes - 1,
                }
              : res,
          ),
        );
      } catch (error) {
        console.error("Error updating like:", error);
      }
    } else {
      // Like - insert new like record
      await supabase.from("likes").insert({
        resolution_id: resolutionId,
        user_email: users[0]?.email,
      });

      setLikes((prev: Likes) => ({
        ...prev,
        [resolutionId]: true,
      }));

      try {
        const { error } = await supabase
          .from("resolution")
          .update({
            likes: resolutions.find((r) => r.id === resolutionId)!.likes + 1,
          })
          .eq("id", resolutionId);

        if (error) throw error;

        setResolutions((prevResolutions) =>
          prevResolutions.map((res) =>
            res.id === resolutionId
              ? {
                  ...res,
                  likes: res.likes + 1,
                }
              : res,
          ),
        );
      } catch (error) {
        console.error("Error updating like:", error);
      }
    }
  };

  return (
    <div className="resolutions-container flex flex-col gap-4 w-full">
      {resolutions.map((resolution) => (
        <Card key={resolution.id}>
          <CardHeader>
            <CardTitle>{resolution.name}</CardTitle>
            {users.map((user: any) =>
              user.id === resolution.user_id ? (
                <p key={user.id}>Email: {user.email}</p>
              ) : null,
            )}
          </CardHeader>
          <CardContent>
            <div key={resolution.id} className="resolution-card">
              <p className="resolution-description">{resolution.description}</p>

              <div className="resolution-interactions flex justify-between">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(resolution.id, star)}
                      className={`star cursor-pointer ${star <= userRating ? "active" : ""}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Rate ${star} stars`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleLike(resolution.id)}
                  className={`like-button flex gap-4 text-blue-400 ${likes[resolution.id] ? "liked" : ""}`}
                >
                  {likes[resolution.id] ? "❤️" : "🤍"}
                  <span>{resolution.likes}</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
