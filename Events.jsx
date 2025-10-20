import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react";
import { format, isFuture, isPast } from "date-fns";

import EventCard from "../components/events/EventCard";
import EventRegistrationModal from "../components/events/EventRegistrationModal";

export default function Events() {
  const [filter, setFilter] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('date'),
    initialData: [],
  });

  const { data: myRegistrations } = useQuery({
    queryKey: ['my-registrations'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.EventRegistration.filter({ user_email: user.email });
    },
    initialData: [],
  });

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    if (filter === "upcoming") return isFuture(eventDate);
    if (filter === "past") return isPast(eventDate);
    if (filter === "registered") {
      return myRegistrations.some(reg => reg.event_id === event.id);
    }
    if (filter !== "all") return event.category === filter;
    return true;
  });

  const isRegistered = (eventId) => {
    return myRegistrations.some(reg => reg.event_id === eventId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Church Events</h1>
              <p className="text-gray-500 mt-1">Connect, grow, and serve together</p>
            </div>
          </div>

          {/* Filters */}
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="bg-white border border-gray-200 p-1 flex-wrap h-auto">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="registered">My Events</TabsTrigger>
              <TabsTrigger value="worship_service">Worship</TabsTrigger>
              <TabsTrigger value="youth">Youth</TabsTrigger>
              <TabsTrigger value="bible_study">Bible Study</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={isRegistered(event.id)}
                onRegister={() => {
                  setSelectedEvent(event);
                  setShowRegistration(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-500">Check back soon for upcoming events</p>
            </CardContent>
          </Card>
        )}

        {/* Registration Modal */}
        {showRegistration && selectedEvent && (
          <EventRegistrationModal
            event={selectedEvent}
            onClose={() => {
              setShowRegistration(false);
              setSelectedEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
