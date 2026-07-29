"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Loader2, LucideIcon } from "lucide-react";
import Link from "next/link";

interface DynamicButtonProps {
  type?: "submit" | "button";
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "danger" | "secondary";
  disabled?: boolean;
  isLoading?: boolean;
  icon?: LucideIcon | null;
  showIcon?: boolean;
  iconPosition?: "left" | "right";
}

const DynamicActionButton = ({
  type = "button",
  label,
  href,
  onClick,
  className,
  variant = "default",
  disabled = false,
  isLoading = false,
  icon: Icon = ArrowUpRight,
  showIcon = false,
  iconPosition = "right",
}: DynamicButtonProps) => {
  // GearUp Emerald Brand Color Variants
  const variantStyles = {
    default:
      "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 shadow-sm shadow-emerald-600/20",
    outline:
      "bg-transparent border-zinc-300 text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 dark:hover:border-emerald-800",
    danger:
      "bg-rose-600 text-white border-rose-600 hover:bg-rose-700 hover:border-rose-700 shadow-sm shadow-rose-600/20",
    secondary:
      "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100/80 hover:border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60 dark:hover:bg-emerald-900/60",
  };

  const combinedClasses = cn(
    "group relative h-11 text-xs sm:h-12 w-fit cursor-pointer sm:text-sm font-semibold rounded-lg transition-all duration-300 border px-6 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    className,
  );

  const renderIcon = () => {
    if (isLoading)
      return <Loader2 className="h-4 w-4 animate-spin text-current" />;

    if (showIcon && Icon) {
      return (
        <Icon
          size={18}
          strokeWidth={2.2}
          className={cn("transition-transform duration-300 shrink-0", {
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5":
              iconPosition === "right",
            "group-hover:-translate-x-0.5": iconPosition === "left",
          })}
        />
      );
    }
    return null;
  };

  const buttonContent = (
    <>
      {iconPosition === "left" && renderIcon()}

      <span
        className={cn("relative z-10 transition-transform duration-300", {
          "group-hover:-translate-x-0.5": iconPosition === "right" && showIcon,
        })}
      >
        {label}
      </span>

      {iconPosition === "right" && renderIcon()}
    </>
  );

  if (href && !disabled) {
    return (
      <Button  className={combinedClasses}>
        <Link href={href} className="flex items-center">
          {buttonContent}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || isLoading}
    >
      {buttonContent}
    </Button>
  );
};

export default DynamicActionButton;
