import {
  Avatar as AvatarComp,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type Props = {
  name: string;
  image: string;
};

export function Avatar({ name, image }: Props) {
  return (
    <AvatarComp>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </AvatarComp>
  );
}
