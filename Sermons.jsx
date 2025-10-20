import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Play, Search, Sparkles, BookOpen, Calendar, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

import SermonAnalyzer from "../components/sermons/SermonAnalyzer";
import SermonCard from "../components/sermons/SermonCard";

export default function Sermons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const { data: sermons, isLoading } = useQuery({
    queryKey: ['sermons'],
    queryFn: () => base44.entities.Sermon.list('-date'),
    initialData: [],
  });

  const filteredSermons = sermons.filter(sermon => 
    sermon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.speaker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.themes?.some(theme => theme.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Sermon Library</h1>
              <p className="text-gray-500 mt-1">Explore messages that transform lives</p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search sermons, speakers, or themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-gray-200 rounded-xl"
              />
            </div>
            <Button
              onClick={() => setShowAnalyzer(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              AI Sermon Analyzer
            </Button>
          </div>
        </div>

        {/* Sermons Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredSermons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <SermonCard 
                key={sermon.id} 
                sermon={sermon}
                onSelect={setSelectedSermon}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-12 text-center">
              <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sermons Yet</h3>
              <p className="text-gray-500 mb-6">Start building your sermon library</p>
              <Button
                onClick={() => setShowAnalyzer(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Upload & Analyze Sermon
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sermon Analyzer Modal */}
        {showAnalyzer && (
          <SermonAnalyzer onClose={() => setShowAnalyzer(false)} />
        )}

        {/* Selected Sermon Detail */}
        {selectedSermon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSermon(null)}>
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-white" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{selectedSermon.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(selectedSermon.date), "MMMM d, yyyy")}
                      </span>
                      {selectedSermon.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedSermon.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedSermon(null)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {selectedSermon.video_url && (
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
                    <video controls className="w-full h-full" src={selectedSermon.video_url}></video>
                  </div>
                )}

                {selectedSermon.summary && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      AI Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{selectedSermon.summary}</p>
                  </div>
                )}

                {selectedSermon.themes && selectedSermon.themes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSermon.themes.map((theme, i) => (
                        <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSermon.key_verses && selectedSermon.key_verses.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Key Verses
                    </h3>
                    <div className="space-y-2">
                      {selectedSermon.key_verses.map((verse, i) => (
                        <div key={i} className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                          <p className="text-gray-700 italic">{verse}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSermon.transcript && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Full Transcript</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedSermon.transcript}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
