/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface TextAreaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  error?: any;
  control: Control<T>;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
}

const TextAreaField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  control,
  required = false,
  readOnly = false,
  rows,
}: TextAreaFieldProps<T>) => {
  return (
    <div className="space-y-1.5">
      <Label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder={placeholder}
            readOnly={readOnly}
            rows={rows}
            className={cn(
              'h-auto min-h-28 w-full rounded-lg px-3.5 py-2.5 text-sm transition-all duration-200',
              'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
              'resize-none border leading-relaxed',
              'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800',
              'text-zinc-900 dark:text-zinc-100',
              'focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:ring-offset-0',
              {
                'cursor-default bg-zinc-100 dark:bg-zinc-900 opacity-70': readOnly,
                'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20': error,
              },
            )}
          />
        )}
      />

      {error && (
        <p className="text-rose-500 text-xs font-medium tracking-tight">
          {typeof error === 'string' ? error : error?.message}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
