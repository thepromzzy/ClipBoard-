"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save } from "lucide-react";

interface SnippetFormProps {
  onAddSnippet: (content: string) => void;
}

export function SnippetForm({ onAddSnippet }: SnippetFormProps) {
  const [content, setContent] = useState("");

  const handlePaste = async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    setContent(pastedText);
    onAddSnippet(pastedText);
    setTimeout(() => setContent(""), 100);
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (content.trim()) {
      onAddSnippet(content);
      setContent("");
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Capture a New Snippet</CardTitle>
        <CardDescription>Paste text into the box below. It will be saved automatically.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste your code snippet here... (Ctrl+V)"
            className="min-h-[120px] resize-none focus:border-primary transition-colors"
            aria-label="New snippet content"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!content.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Save Manually
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
