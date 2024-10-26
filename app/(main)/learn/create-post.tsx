"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { ImageIcon, SmileIcon, BarChart2, MapPinIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  name: string;
  image: string;
};

type Trend = {
  topic: string;
  posts: string;
  url: string;
};

const trends: Trend[] = [
  {
    topic: "Ciencias básicas",
    posts: "180 mil posts",
    url: "@/ciencias-basicas",
  },
  {
    topic: "Ciencias de computación",
    posts: "224 mil posts",
    url: "/ciencias-computacion",
  },
  {
    topic: "Habilidades comunicativas",
    posts: "34,9 mil posts",
    url: "/habilidades-comunicativas",
  },
  {
    topic: "Emprendimiento",
    posts: "59,3 mil posts",
    url: "/emprendimiento",
  },
  { topic: "Decanatura", posts: "40 posts", url: "/decanatura" },
];

const emojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "🎉", "🔥", "💡", "📚"];

export default function CreatePost({ name, image }: Props) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleImageButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + emoji + content.substring(end);
      setContent(newContent);
      setShowEmojiPicker(false);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !category) {
      console.log("Please enter content and select a category");
      return;
    }

    setIsSubmitting(true);

    const postData = {
      content,
      category,
      pollOptions: pollOptions.filter(option => option.trim() !== ""),
    };

    try {
      const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snippet-ON4jpGAljFS7tJkRpkMjgVsjPWXouO.txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      console.log("Post created successfully");
      setContent("");
      setSelectedImage(null);
      setCategory("");
      setPollOptions(["", ""]);
      setShowPollCreator(false);
    }
 catch (error) {
      console.error("Error creating post:", error);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent text-foreground text-lg resize-none outline-none overflow-y-auto"
              placeholder="¿Qué está pasando?!"
              rows={3}
              style={{
                maxHeight: "80vh",
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div {...getRootProps()} className="p-2 mt-2 cursor-pointer">
              <input {...getInputProps()} ref={inputRef} />
              {selectedImage && (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="max-w-full h-auto mt-2 rounded-lg"
                  width={500}
                  height={300}
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            {showPollCreator && (
              <div className="mt-4 space-y-2">
                {pollOptions.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                    placeholder={`Opción ${index + 1}`}
                    className="w-full p-2 border rounded"
                  />
                ))}
                {pollOptions.length < 4 && (
                  <Button type="button" onClick={addPollOption} variant="primary" size="sm">
                    Añadir opción
                  </Button>
                )}
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2 items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleImageButtonClick}
                >
                  <ImageIcon className="h-5 w-5 text-primary" />
                </Button>
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <SmileIcon className="h-5 w-5 text-primary" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          className="text-2xl hover:bg-gray-100 rounded p-1"
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPollCreator(!showPollCreator)}
                >
                  <BarChart2 className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                </Button>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un módulo" />
                  </SelectTrigger>
                  <SelectContent>
                    {trends.map((trend) => (
                      <SelectItem key={trend.topic} value={trend.topic}>
                        {trend.topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                disabled={!content.trim() || !category || isSubmitting}
              >
                {isSubmitting ? 'Posteando...' : 'Postear'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}