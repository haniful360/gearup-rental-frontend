'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: { value: string; label: string }[];
  error?: string;
  control: Control<T>;
  required?: boolean;
  placeholder?: string;
  maxHeight?: string;
  readOnly?: boolean;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  options,
  error,
  control,
  required,
  maxHeight,
  placeholder = 'Select an option',
  readOnly = false,
}: SelectFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const safeValue = value === undefined || value === null ? '' : String(value);
  const selectedLabel = options.find((o) => o.value === safeValue)?.label;

  return (
    <div className="space-y-1.5">
      <Label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>

      <Select
        key={`${name}-${safeValue}`}
        onValueChange={onChange}
        defaultValue={safeValue}
        disabled={readOnly}
      >
        <SelectTrigger
          className={cn(
            'h-11 w-full rounded-lg px-3.5 text-sm shadow-none transition-all duration-200',
            'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800',
            'text-zinc-900 dark:text-zinc-100',
            'focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:ring-offset-0 data-placeholder:text-zinc-400 dark:data-placeholder:text-zinc-500',
            {
              'cursor-not-allowed bg-zinc-100 dark:bg-zinc-900 opacity-70': readOnly,
              'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20': error,
              'cursor-pointer': !readOnly,
            },
          )}
        >
          <SelectValue placeholder={placeholder}>
            {selectedLabel && <span>{selectedLabel}</span>}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className={cn(
            'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100',
          )}
        >
          <div style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer focus:bg-zinc-200 dark:focus:bg-zinc-800"
              >
                {opt.label}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      {error && <p className="text-rose-500 mt-1 text-xs font-medium tracking-tight">{error}</p>}
    </div>
  );
};

export default SelectField;
