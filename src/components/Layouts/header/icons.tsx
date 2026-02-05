import type { IconProps } from "@/types/icon-props";
import { IconBase } from "@/components/icons/IconBase"; // same base used everywhere

export function MenuIcon(props: IconProps) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z" />
      <path d="M4 11h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z" />
      <path d="M4 16h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Z" />
    </IconBase>
  );
}