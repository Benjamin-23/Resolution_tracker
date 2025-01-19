"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Users, Award, Sparkles, BarChart } from "lucide-react";

export default function Achievement() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Resolution Revolution
        </h1>
        <p className="text-gray-600 mt-2">
          Transform your goals into achievements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Support Network</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Resolution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-500" />
            Featured Resolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Read 24 Books in 2025</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">Reading</Badge>
                  <Badge variant="secondary">Personal Growth</Badge>
                </div>
              </div>
              <Button variant="outline">Share Progress</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: 6 books</span>
                <span>25% Complete</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">12</p>
                <p className="text-sm text-gray-600">Supporters</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">8</p>
                <p className="text-sm text-gray-600">Updates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">3</p>
                <p className="text-sm text-gray-600">Milestones</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-800"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Milestone Achieved</p>
                  <p className="text-sm text-gray-600">
                    Completed 5 consecutive days of meditation
                  </p>
                </div>
                <Badge className="ml-auto">2h ago</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
