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
    const supabase = createClient();
    try {
      const { data: userData, error: userError } = await supabase
        .from("auth_user")
        .select("id,email");
      if (userError) throw userError;
      setUsers(userData || []);
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

  const handleRating = (resolutionId: string, rating: number) => {
    setUserRating(rating);
    // API call to save rating
  };

  const handleLike = (resolutionId: string) => {
    setLikes((prev: Likes) => ({
      ...prev,
      [resolutionId]: !prev[resolutionId],
    }));
    // API call to save like
    setResolutions((prevResolutions) =>
      prevResolutions.map((res) =>
        res.id === resolutionId
          ? {
              ...res,
              likes: likes[resolutionId] ? res.likes - 1 : res.likes + 1,
            }
          : res,
      ),
    );
  };

  return (
    <div className="resolutions-container flex flex-col gap-4 w-full">
      {resolutions.map((resolution) => (
        <Card key={resolution.id}>
          <CardHeader>
            <CardTitle>{resolution.name}</CardTitle>
            {/* {users.map((user: any) =>
              user.id === resolution.user_id ? (
                <p key={user.id}>Email: {user.email}</p>
              ) : null,
            )}   */}
            <p>By: {resolution.user_id}</p>
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
                      className={star <= userRating ? "star active" : "star"}
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
