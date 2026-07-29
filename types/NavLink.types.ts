export type ColItem = { label: string; href: string };

export type NavLink = {
  label: string;
  href: string;
  mega?: boolean;
  heading?: string;
  columns?: ColItem[][];
};
