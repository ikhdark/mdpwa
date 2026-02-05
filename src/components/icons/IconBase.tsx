import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export function IconBase({ className = "", ...props }: IconProps) {
  return (
    <svg
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`h-5 w-5 shrink-0 ${className}`}
      {...props}
    />
  );
}