"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum Category {
  MATEMATICA = "MATEMATICA",
  PROGRAMACION = "PROGRAMACION",
  SISTEMAS = "SISTEMAS",
}

type CategorySelectProps = {
  category: Category; 
  setCategory: (value: Category) => void; 
};

const trends = [
  { topic: Category.MATEMATICA, posts: "180 mil posts", url: "/ciencias-basicas" },
  { topic: Category.PROGRAMACION, posts: "224 mil posts", url: "/ciencias-computacion" },
  { topic: Category.SISTEMAS, posts: "34,9 mil posts", url: "/habilidades-comunicativas" },
];

export function CategorySelect({ category, setCategory }: CategorySelectProps) {
  return (
    <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
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
  );
}
