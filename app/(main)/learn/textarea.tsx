"use client";
import { useRef } from "react";

type Props = {
  content: string;
  setContent: (value: string) => void;
};

export function Textarea({ content, setContent }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <textarea
      ref={textareaRef}
      className="w-full bg-transparent text-foreground text-lg resize-none outline-none overflow-y-auto"
      placeholder="¿Qué está pasando?!"
      rows={3}
      style={{ maxHeight: "80vh" }}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
