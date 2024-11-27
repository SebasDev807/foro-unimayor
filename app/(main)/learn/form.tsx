"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPost } from "@/actions/user-post";
import { Avatar } from "./avatar";
import { Textarea } from "./textarea";
import { ImageUploader } from "./image-uploader";
import { PollOptions } from "./poll-options";
import { EmojiPicker } from "./emoji-picker";
import { CategorySelect } from "./category-select";
<<<<<<< HEAD
import { Image } from "lucide-react"; // Importa el ícono de imagen
=======
import { Image } from "lucide-react"; 
>>>>>>> c3cd5fe (Merge branch 'release-2')

type Category = "MATEMATICA" | "PROGRAMACION" | "SISTEMAS";

type Props = {
  name: string;
  image: string;
};

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function Form({ name, image }: Props) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [category, setCategory] = useState<Category>("MATEMATICA");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!content.trim() || !category) return;

  //   setIsSubmitting(true);

  //   try {
  //     const result = await createPost({
  //       body: content,
  //       category,
  //       image: selectedImage,
  //     });

  //     if (result.success) {
  //       setContent("");
  //       setSelectedImage(null);
  //       setCategory("MATEMATICA");
  //     }
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !category) return;

    let imageBase64 = null;
    if (selectedImage) {
      imageBase64 = await fileToBase64(selectedImage);
    }

    const result = await createPost({
      body: content,
      category,
      image: imageBase64, // Pasa la cadena Base64
    });

    if (result.success) {
      setContent("");
      setSelectedImage(null);
      setCategory("MATEMATICA");
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <Avatar name={name} image={image} />
          <div className="flex-grow">
            <Textarea content={content} setContent={setContent} />
            <ImageUploader
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            {showPollCreator && <PollOptions />}
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2 items-center">
                {/* Botón para seleccionar emoticones */}
                <EmojiPicker
                  onEmojiSelect={(emoji) => setContent(content + emoji)}
                  showEmojiPicker={showEmojiPicker}
                  setShowEmojiPicker={setShowEmojiPicker}
                />

                {/* Botón para seleccionar imagen */}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload-input")?.click()
                  }
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Image className="text-gray-600" size={20} />
                </button>

                {/* Selector de categoría */}
                <CategorySelect category={category} setCategory={setCategory} />
              </div>
              <Button type="submit" disabled={isSubmitting} variant="primary">
                {isSubmitting ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
