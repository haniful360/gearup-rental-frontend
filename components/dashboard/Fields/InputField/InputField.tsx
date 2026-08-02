/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T, any>;
  type?: string;
  placeholder?: string;
  error?: any;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  leftIcon?: ReactNode;
  hideLabel?: boolean;
}

const InputField = <T extends FieldValues>({
  label,
  name,
  control,
  type = "text",
  placeholder,
  error,
  required = false,
  readOnly = false,
  className,
  leftIcon,
  hideLabel = false,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    field: { onChange, onBlur, value, ref: controllerRef },
  } = useController({ name, control });

  const isPassword = type === "password";
  const isDate = type === "date" || type === "datetime-local";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1.5">
      {!hideLabel && (
        <Label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </Label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        )}
        <Input
          type={inputType}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          value={(value as any) ?? ""}
          ref={(e) => {
            controllerRef(e);
            inputRef.current = e;
          }}
          onClick={() => !readOnly && isDate && inputRef.current?.showPicker()}
          className={cn(
            "h-11 w-full rounded-xl px-3.5 text-sm transition-all duration-200",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "bg-slate-50 dark:bg-[#0F172A] border-slate-200 dark:border-slate-800/80",
            "text-slate-900 dark:text-slate-100",
            "focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:ring-offset-0",
            {
              "cursor-not-allowed bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 opacity-70":
                readOnly,
              "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20":
                error,
              "cursor-pointer": !readOnly && isDate,
              "pl-9": leftIcon,
            },
            className,
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-rose-500 text-xs font-medium tracking-tight">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
