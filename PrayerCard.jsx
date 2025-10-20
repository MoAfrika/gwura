
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Check, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const categoryColors = {
  health: "bg-red-100 text-red-700 border-red-200",
  family: "bg-blue-100 text-blue-700 border-blue-200",
  career: "bg-green-100 text-green-700 border-green-200",
  spiritual_growth: "bg-purple-100 text-purple-700 border-purple-200",
  relationships: "bg-pink-100 text-pink-700 border-pink-200",
  general: "bg-gray-100 text-gray-700 border-gray-200"
};

export default function PrayerCard({ prayer, onPray, onMarkAnswered }) {
  return (
    <Card className={`border-none shadow-md hover:shadow-xl transition-all active:scale-[0.99] ${
      prayer.is_answered 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50' 
        : 'bg-white'
    }`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <Badge className={`${categoryColors[prayer.category]} border text-xs md:text-sm rounded-full px-3 py-1`}>
            {prayer.category.replace(/_/g, ' ')}
          </Badge>
          {prayer.is_answered && (
            <Badge className="bg-green-500 text-white border-none flex items-center gap-1 text-xs md:text-sm rounded-full px-3 py-1">
              <Check className="w-3 h-3" />
              Answered
            </Badge>
          )}
        </div>

        <h3 className="font-bold text-base md:text-lg text-[#2C2C2E] mb-2 md:mb-3">{prayer.title}</h3>
        <p className="text-[#6B6B6D] text-sm md:text-base mb-3 md:mb-4 line-clamp-3">{prayer.description}</p>

        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[#E8D5A8]/30">
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#6B6B6D]">
            {prayer.is_anonymous ? (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3 md:w-4 md:h-4" />
                Anonymous
              </span>
            ) : (
              <span className="truncate max-w-[150px]">By {prayer.created_by}</span>
            )}
            <span>·</span>
            <span>{formatDistanceToNow(new Date(prayer.created_date), { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3 md:mt-4">
          <Button
            onClick={onPray}
            variant="outline"
            className="flex-1 border-[#E8B4B8] text-[#E8B4B8] hover:bg-[#F5E1E3] rounded-xl h-10 md:h-11 text-sm md:text-base"
            disabled={prayer.is_answered}
          >
            <Heart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Pray</span> ({prayer.prayer_count || 0})
          </Button>
          {!prayer.is_answered && (
            <Button
              onClick={onMarkAnswered}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 rounded-xl w-10 md:w-11 h-10 md:h-11 p-0"
            >
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
