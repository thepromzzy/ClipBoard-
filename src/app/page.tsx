"use client";

import { useState, useEffect } from "react";
import { type Snippet } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { SnippetForm } from "@/components/snippet-form";
import { SnippetCard } from "@/components/snippet-card";
import { ArchiveX } from "lucide-react";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedSnippets = localStorage.getItem("clipboard-plus-snippets");
      if (savedSnippets) {
        setSnippets(JSON.parse(savedSnippets));
      }
    } catch (error) {
      console.error("Failed to load snippets from localStorage", error);
      toast({
        title: "Error",
        description: "Could not load your saved snippets.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const updateLocalStorage = (updatedSnippets: Snippet[]) => {
    try {
      localStorage.setItem(
        "clipboard-plus-snippets",
        JSON.stringify(updatedSnippets)
      );
    } catch (error) {
      console.error("Failed to save snippets to localStorage", error);
      toast({
        title: "Error",
        description: "Could not save your snippet.",
        variant: "destructive",
      });
    }
  };

  const addSnippet = (content: string) => {
    if (!content.trim()) return;
    const newSnippet: Snippet = {
      id: crypto.randomUUID(),
      content,
      tags: [],
      createdAt: Date.now(),
    };
    const updatedSnippets = [newSnippet, ...snippets];
    setSnippets(updatedSnippets);
    updateLocalStorage(updatedSnippets);
    toast({
      title: "Snippet Saved!",
      description: "Your snippet has been saved automatically.",
    });
  };

  const updateSnippet = (updatedSnippet: Snippet) => {
    const updatedSnippets = snippets.map((snippet) =>
      snippet.id === updatedSnippet.id ? updatedSnippet : snippet
    );
    setSnippets(updatedSnippets);
    updateLocalStorage(updatedSnippets);
  };

  const deleteSnippet = (id: string) => {
    const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
    setSnippets(updatedSnippets);
    updateLocalStorage(updatedSnippets);
    toast({
      title: "Snippet Deleted",
      description: "The snippet has been removed.",
    });
  };

  const copySnippet = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Snippet copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <SnippetForm onAddSnippet={addSnippet} />
        <div className="mt-12">
          {snippets.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {snippets.map((snippet) => (
                <SnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  onUpdate={updateSnippet}
                  onDelete={deleteSnippet}
                  onCopy={copySnippet}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center">
              <ArchiveX className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-muted-foreground">Your clipboard is empty.</h2>
              <p className="text-muted-foreground mt-2">Paste some text in the box above to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
