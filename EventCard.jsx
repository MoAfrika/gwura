
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const categoryColors = {
  worship_service: "bg-[#2D3E82]/10 text-[#2D3E82] border-[#2D3E82]/20",
  youth: "bg-[#4A5FAF]/10 text-[#4A5FAF] border-[#4A5FAF]/20",
  bible_study: "bg-[#C9A961]/10 text-[#C9A961] border-[#C9A961]/20",
  community: "bg-[#E8B4B8]/10 text-[#E8B4B8] border-[#E8B4B8]/20",
  outreach: "bg-green-100 text-green-700 border-green-200",
  special: "bg-purple-100 text-purple-700 border-purple-200"
};

export default function EventCard({ event, isRegistered, onRegister }) {
  const spotsLeft = event.capacity ? event.capacity - (event.registered_count || 0) : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <Card className="bg-white border-none shadow-md hover:shadow-2xl transition-all overflow-hidden group active:scale-[0.98]">
      <div className="aspect-video bg-gradient-to-br from-[#C9A961] to-[#E8D5A8] relative overflow-hidden">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Calendar className="w-12 h-12 md:w-16 md:h-16 text-white/80" />
          </div>
        )}
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
          <Badge className={`${categoryColors[event.category]} border text-xs md:text-sm rounded-full px-3 py-1 shadow-sm`}>
            {event.category.replace(/_/g, ' ')}
          </Badge>
        </div>
        {isRegistered && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <Badge className="bg-green-500 text-white border-none flex items-center gap-1 text-xs md:text-sm rounded-full px-3 py-1 shadow-lg">
              <CheckCircle className="w-3 h-3" />
              Registered
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-base md:text-xl text-[#2C2C2E] mb-3 md:mb-4 group-hover:text-[#2D3E82] transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-3 md:mb-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-[#6B6B6D]">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{format(new Date(event.date), "EEEE, MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B6B6D]">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{format(new Date(event.date), "h:mm a")}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B6B6D]">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2 text-[#6B6B6D]">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>
                {event.registered_count || 0} / {event.capacity}
                {spotsLeft !== null && spotsLeft > 0 && (
                  <span className="text-green-600 ml-1">({spotsLeft} left)</span>
                )}
              </span>
            </div>
          )}
        </div>

        <p className="text-[#6B6B6D] text-sm mb-4 line-clamp-2">{event.description}</p>

