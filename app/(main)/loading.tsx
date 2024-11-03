import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center my-[30%]">
      <Loader
        className="h-9 w-9 text-muted-foreground animate-spin" // Ajusta el tamaño aquí
      />
    </div>
  );
};

export default Loading;
