"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { ImageIcon, SmileIcon, CalendarIcon, MapPinIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  image: string;
};

export default function CreatePost({ name, image }: Props) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    inputRef.current?.click(); // Simula el clic en el input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating post:", content, selectedImage);
    setContent("");
    setSelectedImage(null);
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
              className="w-full bg-transparent text-foreground text-lg resize-none outline-none overflow-y-auto"
              placeholder="¿Qué está pasando?!"
              rows={3}
              style={{
                maxHeight: "80vh", // Máximo 80% del alto de la pantalla
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
                  width={500} // Ajusta el ancho según sea necesario
                  height={300} // Ajusta la altura según sea necesario
                  style={{ objectFit: "cover" }} // Ajusta el estilo según sea necesario
                />
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleImageButtonClick}
                >
                  <ImageIcon className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="ghost" size="icon">
                  <SmileIcon className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="ghost" size="icon">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                </Button>
              </div>
              <Button type="submit" disabled={!content.trim()}>
                Postear
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
