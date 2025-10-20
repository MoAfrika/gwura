
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Users, Sparkles, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PrayerRequestForm from "../components/prayer/PrayerRequestForm";
import PrayerCard from "../components/prayer/PrayerCard";

export default function PrayerWall() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data: prayers, isLoading } = useQuery({
    queryKey: ['prayers'],
    queryFn: () => base44.entities.PrayerRequest.list('-created_date'),
    initialData: [],
  });

  const prayForRequest = useMutation({
    mutationFn: async (prayerId) => {
      const prayer = prayers.find(p => p.id === prayerId);
      if (prayer) {
        await base44.entities.PrayerRequest.update(prayerId, {
          prayer_count: (prayer.prayer_count || 0) + 1
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayers'] });
    },
  });

  const markAnswered = useMutation({
    mutationFn: async (prayerId) => {
      await base44.entities.PrayerRequest.update(prayerId, {
        is_answered: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayers'] });
    },
  });

  const filteredPrayers = prayers.filter(prayer => {
    if (filter === "answered") return prayer.is_answered;
    if (filter === "unanswered") return !prayer.is_answered;
    if (filter !== "all") return prayer.category === filter;
    return true;
  });

  const stats = {
    total: prayers.length,
    answered: prayers.filter(p => p.is_answered).length,
    active: prayers.filter(p => !p.is_answered).length,
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#E8B4B8] to-[#F5E1E3] rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-[#E8B4B8]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C2C2E]">Prayer Wall</h1>
              <p className="text-sm md:text-base text-[#6B6B6D] mt-1">Where faith meets community</p>
            </div>
          </div>

          {/* Stats - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <Card className="bg-white border-none shadow-md">
              <CardContent className="p-3 md:p-4">
                <p className="text-xs md:text-sm text-[#6B6B6D] mb-1">Total</p>
                <p className="text-xl md:text-2xl font-bold text-[#2C2C2E]">{stats.total}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-md">
              <CardContent className="p-3 md:p-4">
                <p className="text-xs md:text-sm text-green-700 mb-1">Answered</p>
                <p className="text-xl md:text-2xl font-bold text-green-800">{stats.answered}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#2D3E82]/5 to-[#4A5FAF]/10 border-none shadow-md">
              <CardContent className="p-3 md:p-4">
                <p className="text-xs md:text-sm text-[#2D3E82] mb-1">Active</p>
                <p className="text-xl md:text-2xl font-bold text-[#2D3E82]">{stats.active}</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions - Mobile Optimized */}
          <div className="space-y-3">
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-[#E8B4B8] to-[#F5E1E3] hover:from-[#E8B4B8]/90 hover:to-[#F5E1E3]/90 text-[#2C2C2E] shadow-lg h-12 md:h-14 rounded-2xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Share Prayer Request
            </Button>
            
            <div className="flex gap-2 flex-wrap">
              {["all", "health", "family", "career", "spiritual_growth", "answered"].map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  onClick={() => setFilter(cat)}
                  size="sm"
                  className={`rounded-full text-xs md:text-sm ${
                    filter === cat 
                      ? 'bg-gradient-to-r from-[#2D3E82] to-[#4A5FAF] text-white shadow-md' 
                      : 'border-[#E8D5A8] text-[#6B6B6D] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {cat.replace(/_/g, ' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Prayer Requests Grid - Mobile Optimized */}
        {filteredPrayers.length > 0 ? (
          <div className="grid gap-4 md:gap-6">
            {filteredPrayers.map((prayer) => (
              <PrayerCard
                key={prayer.id}
                prayer={prayer}
                onPray={() => prayForRequest.mutate(prayer.id)}
                onMarkAnswered={() => markAnswered.mutate(prayer.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[#E8D5A8]" />
              <h3 className="text-lg md:text-xl font-semibold text-[#2C2C2E] mb-2">No Prayer Requests</h3>
              <p className="text-sm md:text-base text-[#6B6B6D] mb-6">Be the first to share</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-[#E8B4B8] to-[#F5E1E3] text-[#2C2C2E] hover:from-[#E8B4B8]/90 hover:to-[#F5E1E3]/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Share Prayer Request
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Prayer Form Modal */}
        {showForm && (
          <PrayerRequestForm onClose={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
}
