"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategorySelectProps = {
  category: string;
  setCategory: (value: string) => void;
};

const trends = [
  { topic: "MATEMATICA", posts: "180 mil posts", url: "/ciencias-basicas" },
  {
    topic: "PROGRAMACION",
    posts: "224 mil posts",
    url: "/ciencias-computacion",
  },
  {
    topic: "SISTEMAS",
    posts: "34,9 mil posts",
    url: "/habilidades-comunicativas",
  },
];

export function CategorySelect({ category, setCategory }: CategorySelectProps) {
  return (
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
  );
}
