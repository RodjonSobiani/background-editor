import WorkingAreaPageContent from '@page-content/working-area-page';
import { IPageProps } from '@shared/interfaces/page-props';

interface PageParams {
  id: string;
}

const WorkingArea = async ({ params }: IPageProps<PageParams>) => {
  const { id } = await params;

  return <WorkingAreaPageContent id={id} />;
};

export default WorkingArea;

export const metadata = {
  title: 'Working Area Page',
  description: 'Working Area Page content',
  keywords: 'Working Area, page, content'
};
