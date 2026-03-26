import { ReactNode } from 'react';

export const LayoutProfileModal = ({ description, form }: { description: ReactNode; form: ReactNode }) => {
  return (
    <div className="text-secondary flex flex-col gap-4">
      {description}
      {form}
    </div>
  );
};
