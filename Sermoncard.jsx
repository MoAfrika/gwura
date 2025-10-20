
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, Sparkles } from "lucide-react";
import { format } from "date-fns";

export default function SermonCard({ sermon, onSelect }) {
  return (
    <Card 
      className="group bg-white border-none shadow-md hover:shadow-2xl transition-all cursor-pointer overflow-hidden active:scale-[0.98]"
      onClick={() => onSelect(sermon)}
    >
      <div className="aspect-video bg-gradient-to-br from-[#2D3E82] to-[#4A5FAF] relative overflow-hidden">
        {sermon.video_url ? (
          <img 
            src={sermon.video_url} 
            alt={sermon.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Play className="w-12 h-12 md:w-16 md:h-16 text-white/80" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
        {sermon.summary && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <Badge className="bg-[#C9A961] text-white border-none flex items-center gap-1 text-xs rounded-full px-3 py-1 shadow-lg">
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">AI Analyzed</span>
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-base md:text-lg text-[#2C2C2E] mb-2 line-clamp-2 group-hover:text-[#2D3E82] transition-colors">
          {sermon.title}
        </h3>
        <p className="text-sm text-[#6B6B6D] mb-3 md:mb-4">{sermon.speaker}</p>
        
        <div className="flex items-center gap-3 md:gap-4 text-xs text-[#C9A961] mb-3 md:mb-4 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
            {format(new Date(sermon.date), "MMM d, yyyy")}
          </span>
          {sermon.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              {sermon.duration}
            </span>
          )}
        </div>

        {sermon.themes && sermon.themes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sermon.themes.slice(0, 3).map((theme, i) => (
              <Badge key={i} variant="secondary" className="bg-[#FAF8F5] text-[#2D3E82] border-[#E8D5A8] text-xs rounded-full">
                {theme}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
