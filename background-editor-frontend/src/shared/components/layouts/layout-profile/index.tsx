import { ReactNode } from 'react';

export const LayoutProfile = ({
  avatar,
  name,
  email,
  password,
  save
}: {
  avatar: ReactNode;
  name: ReactNode;
  email: ReactNode;
  password: ReactNode;
  save: ReactNode;
}) => {
  return (
    <div className="layout-content-container">
      <div className="mb-12 flex gap-8 max-md:flex-col md:flex-col lg:flex-row">
        <div className="avatar-container">{avatar}</div>

        <div className="grid w-full grid-cols-2 gap-6 max-md:grid-cols-1">
          {name}
          <div />
          {email}
          {password}
        </div>
      </div>

      <div className="flex justify-end">{save}</div>
    </div>
  );
};
