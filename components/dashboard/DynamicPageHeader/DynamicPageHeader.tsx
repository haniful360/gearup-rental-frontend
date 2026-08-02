interface DynamicPageHeaderProps {
  title: string;
  description?: string;
}

const DynamicPageHeader = ({ title, description }: DynamicPageHeaderProps) => {
  return (
    <div className="mb-6 space-y-1">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default DynamicPageHeader;
