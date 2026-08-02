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
      <Label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
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
            'h-11 w-full rounded-xl px-3.5 text-sm shadow-none transition-all duration-200',
            'bg-slate-50 dark:bg-[#0F172A] border-slate-200 dark:border-slate-800/80',
            'text-slate-900 dark:text-slate-100',
            'focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:ring-offset-0 data-placeholder:text-slate-400 dark:data-placeholder:text-slate-500',
            {
              'cursor-not-allowed bg-slate-100 dark:bg-slate-900 opacity-70': readOnly,
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
            'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-xl rounded-xl',
          )}
        >
          <div style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined} className="p-1 space-y-0.5">
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800/80 rounded-lg"
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
