"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";

type Props = {
  onEmojiSelect: (emoji: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (value: boolean) => void;
};

export function EmojiPicker({
  onEmojiSelect,
  showEmojiPicker,
  setShowEmojiPicker,
}: Props) {
  const emojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "🎉", "🔥", "💡", "📚"];

  return (
    <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
      <PopoverTrigger asChild>
        <button>
          <SmileIcon className="h-5 w-5 text-primary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-5 gap-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              className="text-2xl hover:bg-gray-100 rounded p-1"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
