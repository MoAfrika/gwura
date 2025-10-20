import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, CheckCircle, Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

export default function EventRegistrationModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    attendees_count: 1,
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const user = await base44.auth.me();
      await base44.entities.EventRegistration.create({
        ...data,
        event_id: event.id,
        user_email: user.email
      });
      
      // Update event registered count
      await base44.entities.Event.update(event.id, {
        registered_count: (event.registered_count || 0) + data.attendees_count
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['my-registrations'] });
      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
        <Card className="max-w-md w-full bg-white" onClick={(e) => e.stopPropagation()}>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're Registered!</h3>
            <p className="text-gray-600">We look forward to seeing you at the event</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <Card className="max-w-2xl w-full bg-white" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle>Register for Event</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Event Details */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-700">
