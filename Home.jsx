import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Heart, Calendar, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const { data: recentSermons } = useQuery({
    queryKey: ['sermons-recent'],
    queryFn: () => base44.entities.Sermon.list('-date', 3),
    initialData: [],
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ['events-upcoming'],
    queryFn: () => base44.entities.Event.list('date', 3),
    initialData: [],
  });

  const { data: recentPrayers } = useQuery({
    queryKey: ['prayers-recent'],
    queryFn: () => base44.entities.PrayerRequest.list('-created_date', 4),
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section - Mobile Optimized */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2D3E82] via-[#4A5FAF] to-[#2D3E82]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920')] bg-cover bg-center opacity-5"></div>
        <div className="relative px-4 py-12 md:py-20 lg:py-32 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#C9A961]" />
              <span className="text-white/90 text-sm font-medium">Welcome Home</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
              God With Us Royal Assembly
            </h1>
            <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
              A community united in faith, growing together in Christ's love
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={createPageUrl("Sermons")} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#2D3E82] hover:bg-white/90 px-6 md:px-8 shadow-xl h-12 md:h-14 rounded-2xl font-semibold">
                  <Video className="w-5 h-5 mr-2" />
                  Watch Sermons
                </Button>
              </Link>
              <Link to={createPageUrl("Events")} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-6 md:px-8 h-12 md:h-14 rounded-2xl font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Quick Stats - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
          <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2D3E82]/10 rounded-2xl flex items-center justify-center mb-2">
                  <Video className="w-5 h-5 md:w-6 md:h-6 text-[#2D3E82]" />
                </div>
                <p className="text-xs md:text-sm font-medium text-[#6B6B6D]">Sermons</p>
                <p className="text-2xl md:text-3xl font-bold text-[#2C2C2E]">{recentSermons.length}+</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#E8B4B8]/20 to-[#F5E1E3]/30 border-none shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E8B4B8]/30 rounded-2xl flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#E8B4B8]" />
                </div>
                <p className="text-xs md:text-sm font-medium text-[#6B6B6D]">Prayers</p>
                <p className="text-2xl md:text-3xl font-bold text-[#2C2C2E]">{recentPrayers.length}+</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#C9A961]/10 to-[#E8D5A8]/20 border-none shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#C9A961]/20 rounded-2xl flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#C9A961]" />
                </div>
                <p className="text-xs md:text-sm font-medium text-[#6B6B6D]">Events</p>
                <p className="text-2xl md:text-3xl font-bold text-[#2C2C2E]">{upcomingEvents.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#2D3E82]/5 to-[#4A5FAF]/10 border-none shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2D3E82]/10 rounded-2xl flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#2D3E82]" />
                </div>
                <p className="text-xs md:text-sm font-medium text-[#6B6B6D]">Growing</p>
                <p className="text-2xl md:text-3xl font-bold text-[#2C2C2E]">Daily</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Content - Mobile Optimized */}
        <div className="space-y-6 md:space-y-8">
          {/* Latest Sermons */}
          <Card className="bg-white border-none shadow-lg overflow-hidden">
            <CardHeader className="border-b border-[#E8D5A8]/30 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl md:text-2xl font-bold text-[#2C2C2E]">Latest Sermons</CardTitle>
                <Link to={createPageUrl("Sermons")}>
                  <Button variant="ghost" size="sm" className="text-[#2D3E82] hover:text-[#4A5FAF] hover:bg-[#FAF8F5]">
                    <span className="hidden sm:inline">View All</span>
                    <ArrowRight className="w-4 h-4 sm:ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {recentSermons.length > 0 ? (
                  recentSermons.map((sermon) => (
                    <div key={sermon.id} className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-2xl hover:bg-[#FAF8F5] transition-colors cursor-pointer active:scale-[0.98]">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#2D3E82] to-[#4A5FAF] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#2C2C2E] mb-1 text-sm md:text-base line-clamp-2">{sermon.title}</h3>
                        <p className="text-xs md:text-sm text-[#6B6B6D]">{sermon.speaker}</p>
                        <p className="text-xs text-[#C9A961] mt-1 font-medium">
                          {sermon.date && format(new Date(sermon.date), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 md:py-12 text-[#6B6B6D]">
                    <Video className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 text-[#E8D5A8]" />
                    <p className="text-sm md:text-base">No sermons yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Prayer Wall Preview */}
          <Card className="bg-gradient-to-br from-[#F5E1E3] to-white border-none shadow-lg overflow-hidden">
            <CardHeader className="border-b border-[#E8B4B8]/30 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl md:text-2xl font-bold text-[#2C2C2E] flex items-center gap-2">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#E8B4B8]" />
                  Prayer Wall
                </CardTitle>
                <Link to={createPageUrl("PrayerWall")}>
                  <Button variant="ghost" size="sm" className="text-[#E8B4B8] hover:text-[#E8B4B8]/80 hover:bg-white/50">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3">
                {recentPrayers.length > 0 ? (
                  recentPrayers.slice(0, 3).map((prayer) => (
                    <div key={prayer.id} className="p-3 md:p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#E8B4B8]/20 active:scale-[0.98] transition-transform">
                      <div className="flex items-start gap-3">
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#E8B4B8] flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#2C2C2E] text-sm md:text-base mb-1 line-clamp-1">{prayer.title}</h4>
                          <p className="text-xs md:text-sm text-[#6B6B6D] line-clamp-2">{prayer.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-[#C9A961] font-medium">{prayer.prayer_count || 0} praying</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[#6B6B6D]">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-[#E8B4B8]/50" />
                    <p className="text-sm">No prayer requests yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <Card className="bg-white border-none shadow-lg overflow-hidden">
              <CardHeader className="border-b border-[#E8D5A8]/30 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl md:text-2xl font-bold text-[#2C2C2E]">Upcoming Events</CardTitle>
                  <Link to={createPageUrl("Events")}>
                    <Button variant="ghost" size="sm" className="text-[#2D3E82] hover:text-[#4A5FAF] hover:bg-[#FAF8F5]">
                      <span className="hidden sm:inline">View All</span>
                      <ArrowRight className="w-4 h-4 sm:ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#F5E1E3] hover:shadow-md transition-all cursor-pointer active:scale-[0.98]">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#C9A961] to-[#E8D5A8] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Calendar className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm md:text-base text-[#2C2C2E] mb-1 line-clamp-2">{event.title}</h3>
                          <p className="text-xs md:text-sm text-[#6B6B6D] mb-2 line-clamp-1">{event.description}</p>
                          <div className="flex items-center text-xs text-[#C9A961] font-medium">
                            {event.date && format(new Date(event.date), "MMM d, h:mm a")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:mt-12">
          <Link to={createPageUrl("Members")} className="block">
            <Card className="bg-gradient-to-br from-[#2D3E82] to-[#4A5FAF] border-none shadow-lg hover:shadow-2xl transition-all text-white cursor-pointer active:scale-[0.98] h-full">
              <CardContent className="p-6 md:p-8 text-center">
                <Users className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold mb-2">Connect</h3>
                <p className="text-white/80 text-sm">Build meaningful relationships</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("BookClub")} className="block">
            <Card className="bg-gradient-to-br from-[#C9A961] to-[#E8D5A8] border-none shadow-lg hover:shadow-2xl transition-all text-white cursor-pointer active:scale-[0.98] h-full">
              <CardContent className="p-6 md:p-8 text-center">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold mb-2">Book Club</h3>
                <p className="text-white/90 text-sm">Grow through reading</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("Give")} className="block sm:col-span-2 lg:col-span-1">
            <Card className="bg-gradient-to-br from-[#E8B4B8] to-[#F5E1E3] border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer active:scale-[0.98] h-full">
              <CardContent className="p-6 md:p-8 text-center">
                <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-[#E8B4B8]" />
                <h3 className="text-lg md:text-xl font-bold mb-2 text-[#2C2C2E]">Give</h3>
                <p className="text-[#6B6B6D] text-sm">Support the ministry</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
