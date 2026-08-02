'use client';

import React from 'react';
import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ClipboardList,
  DollarSign,
  AlertTriangle,
  ShoppingBag,
  Clock,
  Star,
  ShieldAlert,
  ShieldCheck,
  Boxes,
  MessageSquare,
  PlusCircle,
  Compass,
} from 'lucide-react';
import { IStatCard, IStatTrend } from '@/types/stat-card.types';

const iconDictionary: Record<string, LucideIcon> = {
  Users,
  Package,
  ClipboardList,
  DollarSign,
  AlertTriangle,
  ShoppingBag,
  Clock,
  Star,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Boxes,
  MessageSquare,
  PlusCircle,
  Compass,
};

interface DynamicStatCardProps extends IStatCard {
  index?: number;
  className?: string;
}

const colorMap: Record<string, { bg: string; iconBg: string; text: string; border: string }> = {
  emerald: {
    bg: 'bg-emerald-500/5 hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/15',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
  },
  blue: {
    bg: 'bg-blue-500/5 hover:bg-blue-500/10 dark:bg-blue-500/10 dark:hover:bg-blue-500/15',
    iconBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
  },
  amber: {
    bg: 'bg-amber-500/5 hover:bg-amber-500/10 dark:bg-amber-500/10 dark:hover:bg-amber-500/15',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20',
  },
  purple: {
    bg: 'bg-purple-500/5 hover:bg-purple-500/10 dark:bg-purple-500/10 dark:hover:bg-purple-500/15',
    iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
  },
  rose: {
    bg: 'bg-rose-500/5 hover:bg-rose-500/10 dark:bg-rose-500/10 dark:hover:bg-rose-500/15',
    iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/5 hover:bg-cyan-500/10 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/15',
    iconBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
  },
};

const paletteOrder = ['emerald', 'blue', 'purple', 'amber', 'rose', 'cyan'];

function formatStatValue(
  value: string | number,
  formatter?: 'number' | 'currency' | 'percent' | 'raw'
): string {
  if (typeof value === 'string' && isNaN(Number(value))) {
    return value;
  }
  const num = typeof value === 'number' ? value : Number(value);
  if (isNaN(num)) return String(value);

  if (formatter === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: num % 1 === 0 ? 0 : 2,
    }).format(num);
  }
  if (formatter === 'percent') {
    return `${num.toFixed(1)}%`;
  }
  if (formatter === 'number') {
    return new Intl.NumberFormat('en-US').format(num);
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: num % 1 === 0 ? 0 : 2,
  }).format(num);
}

const DynamicStatCard: React.FC<DynamicStatCardProps> = ({
  title,
  value,
  trend,
  isUp,
  icon,
  iconName,
  iconBg,
  color,
  subtext,
  formatter,
  index = 0,
  className = '',
}) => {
  const chosenTheme = color || paletteOrder[index % paletteOrder.length];
  const theme = colorMap[chosenTheme] || colorMap.emerald;

  const displayValue = formatStatValue(value, formatter);

  const IconComponent: LucideIcon | null =
    typeof icon === 'function' || typeof icon === 'object'
      ? icon
      : iconName && iconDictionary[iconName]
      ? iconDictionary[iconName]
      : null;

  let trendData: IStatTrend | null = null;
  if (typeof trend === 'object' && trend !== null) {
    trendData = trend;
  } else if (typeof trend === 'string' || typeof trend === 'number') {
    trendData = { value: trend, isUp: isUp ?? true };
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${theme.border} ${theme.bg} ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        {IconComponent && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${iconBg || theme.iconBg}`}
          >
            <IconComponent className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {displayValue}
        </h3>

        {trendData && (
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              trendData.isUp !== false
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
            }`}
          >
            {trendData.isUp !== false ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trendData.value}</span>
          </div>
        )}
      </div>

      {subtext && (
        <p className="mt-1.5 text-xs text-muted-foreground">{subtext}</p>
      )}
    </div>
  );
};

export default DynamicStatCard;
