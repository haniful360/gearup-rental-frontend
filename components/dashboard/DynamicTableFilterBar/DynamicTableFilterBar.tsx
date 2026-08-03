'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ITableFilter } from '@/types/table-filter.types';
import { CalendarIcon, Download, Search } from 'lucide-react';

interface DynamicTableFilterBarProps {
  fields: ITableFilter[];
  showExport?: boolean;
  exportText?: string;
  onExport?: () => void;
}

export default function DynamicTableFilterBar({
  fields,
  showExport = false,
  exportText = 'Export CSV',
  onExport,
}: DynamicTableFilterBarProps) {
  const searchField = fields.find((f) => f.type === 'search');
  const otherFields = fields.filter((f) => f.type !== 'search');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
        {/* Search Field */}
        {searchField && (
          <div className="group relative w-full sm:w-72 md:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
            <Input
              placeholder={searchField.placeholder || 'Search...'}
              onChange={(e) => searchField.onChange(e.target.value)}
              value={searchField?.value || ''}
              className="h-10 w-full rounded-xl border border-border/80 bg-background dark:bg-[#0E1726]/90 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 focus-visible:ring-offset-0"
            />
          </div>
        )}

        {/* Select & Date Fields */}
        {otherFields.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {otherFields.map((field, index) => {
              if (field.type === 'select') {
                return (
                  <div
                    key={`${field.name}-${field.value || index}`}
                    className="w-full sm:w-auto min-w-[150px]"
                  >
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || 'all'}
                      value={field.value || 'all'}
                    >
                      <SelectTrigger className="h-10! w-full cursor-pointer rounded-xl border border-border/80 dark:border-white/10 bg-background dark:bg-[#0E1726]/90 px-3.5 text-xs sm:text-sm text-foreground focus:ring-2! focus:ring-emerald-500/30! focus:border-emerald-500! transition-all hover:border-emerald-500/40">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border border-border dark:border-white/10 bg-card text-card-foreground shadow-xl">
                        {field.options?.map((opt) => (
                          <SelectItem
                            key={opt?.value}
                            value={opt?.value}
                            className="cursor-pointer text-xs sm:text-sm rounded-lg focus:bg-emerald-500/10 focus:text-emerald-600 dark:focus:text-emerald-400 font-medium"
                          >
                            {opt?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              if (field.type === 'date') {
                return (
                  <div key={index} className="relative w-full sm:w-auto min-w-[150px]">
                    <Input
                      type="text"
                      placeholder={field.placeholder || 'mm/dd/yyyy'}
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => (e.target.type = 'text')}
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ''}
                      className="h-10 w-full rounded-xl border border-border/80 dark:border-white/10 bg-background dark:bg-[#0E1726]/90 pr-9 text-xs sm:text-sm text-foreground focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                    />
                    <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Export Button */}
      {showExport && (
        <button
          onClick={onExport}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-emerald-600/20 bg-emerald-500/10 px-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-all hover:bg-emerald-500/20 active:scale-[0.98]"
        >
          <Download size={15} />
          <span>{exportText}</span>
        </button>
      )}
    </div>
  );
}
