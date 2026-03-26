import { useQuery } from '@tanstack/react-query';
import { WorkingAreaService } from '@shared/api/working-area.service';
import { EQueryValues } from '@shared/utils/enums';

export const useGetWorkingAreaUseCase = (id: string) => {
  return useQuery({
    queryKey: [EQueryValues.GET_WORKING_AREA, id],
    queryFn: () => WorkingAreaService.get(id)
  });
};
