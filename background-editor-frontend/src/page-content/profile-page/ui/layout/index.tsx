import { ReactNode } from 'react';

export const Layout = ({
  caption,
  actionsList,
  content
}: {
  caption: string;
  actionsList: ReactNode;
  content: ReactNode;
}) => {
  return (
    <div className="layout-container">
      <div className="actions-list-container">{actionsList}</div>

      <div className="layout-content-wrapper">
        <h4 className="text-2xl font-medium">{caption}</h4>

        {content}
      </div>
    </div>
  );
};
