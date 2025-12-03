import { ClipboardCopy } from "lucide-react";

export function Header() {
  return (
    <header className="py-8 border-b border-border mb-8">
      <div className="container mx-auto flex items-center gap-3">
        <ClipboardCopy className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">ClipBoard+</h1>
        <span className="text-xs font-medium text-muted-foreground mt-2">by Devs, for Devs</span>
      </div>
    </header>
  );
}
