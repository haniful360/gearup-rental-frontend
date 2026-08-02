import { LucideIcon } from 'lucide-react';

export interface IStatTrend {
  value: number | string;
  isUp?: boolean;
  label?: string;
}

export interface IStatCard {
  id?: number | string;
  title: string;
  value: string | number;
  trend?: string | IStatTrend;
  isUp?: boolean;
  icon?: LucideIcon;
  iconName?: string;
  borderActive?: string;
  iconBg?: string;
  color?: string;
  subtext?: string;
  formatter?: 'number' | 'currency' | 'percent' | 'raw';
}


export type IStatItem = IStatCard;

