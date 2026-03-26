import { Button } from '@shared/components/buttons';
import { ReactNode } from 'react';

export const ChangeAttribute = ({
  value,
  label,
  description,
  icon,
  onClick
}: {
  value: string;
  label: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-secondary mb-2 text-sm font-medium">{label}</span>
      <span className="mb-4">{value}</span>

      <Button variant="secondary" className="flex items-center justify-center gap-1" onClick={onClick}>
        {icon}
        <span>{description}</span>
      </Button>
    </div>
  );
};
