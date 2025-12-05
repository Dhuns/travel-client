"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PrivacyContent } from "./privacy-content";
import { TermsContent } from "./terms-content";

interface PolicyDialogProps {
  type: "terms" | "privacy" | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PolicyDialog({ type, open, onOpenChange }: PolicyDialogProps) {
  const config = {
    terms: {
      title: "Terms of Service",
      description: "Last updated: November 2025",
      content: <TermsContent />,
    },
    privacy: {
      title: "Privacy Policy",
      description: "Last updated: November 2025",
      content: <PrivacyContent />,
    },
  };

  const currentConfig = type ? config[type] : config.terms;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{currentConfig.title}</DialogTitle>
          <DialogDescription>{currentConfig.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">{currentConfig.content}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
