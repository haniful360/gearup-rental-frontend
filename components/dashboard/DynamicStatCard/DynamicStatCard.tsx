'use client';

const DynamicStatCard = ({
  title,
  value,
  icon: Icon,
  iconBg,
  index,
}: any) => {
  const colors: ('blue' | 'green' | 'purple' | 'yellow')[] = ['blue', 'green', 'purple', 'yellow'];
  const autoColor = colors[index % colors.length];

  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/10',
    green: 'border-emerald-500/30 bg-emerald-500/10',
    purple: 'border-purple-500/30 bg-purple-500/10',
    yellow: 'border-amber-500/30 bg-amber-500/10',
  };

  return (
    <div className={`rounded-xl border p-6 ${colorMap[autoColor] || colorMap.blue}`}>
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-zinc-400">{title}</span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-2 flex items-end gap-4">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
};

export default DynamicStatCard;
