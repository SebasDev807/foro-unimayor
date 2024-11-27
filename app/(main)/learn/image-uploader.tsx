import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
};

export function ImageUploader({ selectedImage, setSelectedImage }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="p-2 mt-2">
      <input
        {...getInputProps()}
        ref={inputRef}
        id="image-upload-input"
        style={{ display: "none" }} // Oculta el input
      />
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
  );
}
