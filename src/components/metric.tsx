import { LucideIcon } from "lucide-react";

interface MetricProps {
  Icon: LucideIcon;
  title: string;
  value: string | number;
}

export const MetricComponent = ({ Icon, title, value }: MetricProps) => {
  return (
    <div className="flex items-center gap-1">
      <Icon className="h-4 w-4" />
      <p className="text-xs">{value}</p>
      <p className="text-xs">{title}</p>
    </div>
  );
};
