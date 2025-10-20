import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Heart } from "lucide-react";

export default function PrayerRequestForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    is_anonymous: false
  });

  const queryClient = useQueryClient();

  const createPrayer = useMutation({
    mutationFn: (data) => base44.entities.PrayerRequest.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayers'] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPrayer.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <Card className="max-w-2xl w-full bg-white" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600" />
              Share Prayer Request
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Prayer Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of your prayer need"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Details *</Label>
              <Textarea
                id="description"
                placeholder="Share more details about your prayer request..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 min-h-32"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
