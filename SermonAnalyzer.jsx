import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles, Loader2, X, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SermonAnalyzer({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    date: "",
    duration: ""
  });
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const analyzeSermon = async () => {
    if (!file || !formData.title || !formData.speaker || !formData.date) {
      setError("Please fill in all required fields and upload a file");
      return;
    }

    setAnalyzing(true);
    setProgress(10);

    try {
      // Upload file
      setProgress(30);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      // Extract transcript
      setProgress(50);
      const extractResult = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            transcript: { type: "string" }
          }
        }
      });

      if (extractResult.status !== "success" || !extractResult.output?.transcript) {
        throw new Error("Could not extract transcript from file");
      }

      const transcript = extractResult.output.transcript;

      // AI Analysis
      setProgress(70);
      const analysisResult = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this sermon transcript and provide:
        1. A concise summary (2-3 sentences)
