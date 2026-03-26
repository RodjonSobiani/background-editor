import { HistoryCard } from '@shared/components/history-card';
import { HistoryNotice } from '@shared/components/history-notice';
import useGetHistoryPresenter from '@entities/cases/profile/get-history/presenter';

export const HistoryViewer = () => {
  const { data } = useGetHistoryPresenter();

  return (
    <div>
      <HistoryNotice />

      <div className="history-container">
        {data.map((item) => (
          <HistoryCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
