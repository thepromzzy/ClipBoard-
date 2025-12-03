"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { type Snippet } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Tag, X } from "lucide-react";

interface SnippetCardProps {
  snippet: Snippet;
  onUpdate: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
}

export function SnippetCard({ snippet, onUpdate, onDelete, onCopy }: SnippetCardProps) {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...new Set([...snippet.tags, tagInput.trim().toLowerCase()])];
      onUpdate({ ...snippet, tags: newTags });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = snippet.tags.filter((tag) => tag !== tagToRemove);
    onUpdate({ ...snippet, tags: newTags });
  };

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <CardTitle className="text-base font-normal text-muted-foreground">
            {formatDistanceToNow(new Date(snippet.createdAt), { addSuffix: true })}
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onCopy(snippet.content)} aria-label="Copy snippet">
            <Copy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(snippet.id)} className="text-muted-foreground hover:text-destructive" aria-label="Delete snippet">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <pre className="bg-background rounded-md p-4 text-sm overflow-x-auto max-h-48">
          <code>{snippet.content}</code>
        </pre>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer group relative pr-7">
              {tag}
              <button onClick={() => handleRemoveTag(tag)} className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="relative w-full">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add a tag and press Enter"
            className="pl-9"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
