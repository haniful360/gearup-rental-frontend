'use client';

import React from 'react';
import { IStatCard } from '@/types/stat-card.types';
import DynamicStatCard from './DynamicStatCard';

interface StatsGridProps {
  stats: IStatCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridColsMap = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 4,
  className = '',
}) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className={`grid gap-4 ${gridColsMap[columns]} ${className}`}>
      {stats.map((stat, idx) => (
        <DynamicStatCard
          key={stat.id || stat.title || idx}
          {...stat}
          index={idx}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
