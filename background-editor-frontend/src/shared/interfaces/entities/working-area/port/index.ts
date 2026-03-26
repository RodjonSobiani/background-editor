interface ICreateWorkingAreaPort {
  images: File[];
}
interface IRemoveImagesWorkingAreaPort {
  id: string;
  ids: string[];
}

interface IAddImagesWorkingAreaPort {
  id: string;
  images: File[];
}

export type { ICreateWorkingAreaPort, IRemoveImagesWorkingAreaPort, IAddImagesWorkingAreaPort };
