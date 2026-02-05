import { SVGProps } from "react";

export type PropsType = SVGProps<SVGSVGElement>;

/* ================= BASE ================= */

function IconBase({ className = "", ...props }: PropsType) {
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

/* ================= CHEVRON ================= */

export function ChevronUp(props: PropsType) {
  return (
    <IconBase viewBox="0 0 16 8" {...props}>
      <path d="M7.553.728a.687.687 0 01.895 0l6.416 5.5a.688.688 0 01-.895 1.044L8 2.155 2.03 7.272a.688.688 0 11-.894-1.044l6.417-5.5z" />
    </IconBase>
  );
}

/* ================= HOME ================= */

export function HomeIcon(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M9 17.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" />
      <path d="M12 1.25c-.725 0-1.387.2-2.11.537-.702.327-1.512.81-2.528 1.415l-1.456.867c-1.119.667-2.01 1.198-2.686 1.706C2.523 6.3 2 6.84 1.66 7.551c-.342.711-.434 1.456-.405 2.325.029.841.176 1.864.36 3.146l.293 2.032c.237 1.65.426 2.959.707 3.978.29 1.05.702 1.885 1.445 2.524.742.64 1.63.925 2.716 1.062 1.056.132 2.387.132 4.066.132h2.316c1.68 0 3.01 0 4.066-.132 1.086-.137 1.974-.422 2.716-1.061.743-.64 1.155-1.474 1.445-2.525.281-1.02.47-2.328.707-3.978l.292-2.032c.185-1.282.332-2.305.36-3.146.03-.87-.062-1.614-.403-2.325C22 6.84 21.477 6.3 20.78 5.775c-.675-.508-1.567-1.039-2.686-1.706l-1.456-.867c-1.016-.605-1.826-1.088-2.527-1.415-.724-.338-1.386-.537-2.111-.537z" />
    </IconBase>
  );
}

/* ================= CALENDAR ================= */

export function Calendar(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M17 14a1 1 0 100-2 1 1 0 000 2zM17 18a1 1 0 100-2 1 1 0 000 2zM13 13a1 1 0 11-2 0 1 1 0 012 0zM13 17a1 1 0 11-2 0 1 1 0 012 0zM7 14a1 1 0 100-2 1 1 0 000 2zM7 18a1 1 0 100-2 1 1 0 000 2z" />
      <path d="M7 1.75h10.5a3.75 3.75 0 013.75 3.75v11a3.75 3.75 0 01-3.75 3.75H7a3.75 3.75 0 01-3.75-3.75v-11A3.75 3.75 0 017 1.75z" />
    </IconBase>
  );
}

/* ================= USER ================= */

export function User(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM12 12.25c-4.5 0-8.75 2.3-8.75 5.25s4.25 5.25 8.75 5.25 8.75-2.3 8.75-5.25-4.25-5.25-8.75-5.25z" />
    </IconBase>
  );
}

/* ================= ALPHABET ================= */

export function Alphabet(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M3 7h10M3 12h7M3 17h5M17 7l4.5 10M17 7l-4.5 10M15.5 13h5" />
    </IconBase>
  );
}

/* ================= TABLE ================= */

export function Table(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M3 6h18v12H3zM3 12h18M9 6v12M15 6v12" />
    </IconBase>
  );
}

/* ================= PIE ================= */

export function PieChart(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path d="M12 2v10h10A10 10 0 0012 2z" />
      <path d="M12 12V2A10 10 0 1022 12H12z" />
    </IconBase>
  );
}

/* ================= FOUR CIRCLE ================= */

export function FourCircle(props: PropsType) {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <circle cx="6.5" cy="6.5" r="4" />
      <circle cx="17.5" cy="6.5" r="4" />
      <circle cx="6.5" cy="17.5" r="4" />
      <circle cx="17.5" cy="17.5" r="4" />
    </IconBase>
  );
}

/* ================= ARROW LEFT ================= */

export function ArrowLeftIcon(props: PropsType) {
  return (
    <IconBase viewBox="0 0 18 18" {...props}>
      <path d="M7.9 4.1L3.6 8.4H15v1.2H3.6l4.3 4.3-1 1L2 9l4.9-4.9z" />
    </IconBase>
  );
}