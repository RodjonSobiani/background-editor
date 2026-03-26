interface IImageWorkingAreaDto {
  id: string;
  url: string;
  history: string[];
}

interface IWorkingAreaDto {
  id: string;
  images: IImageWorkingAreaDto[];
}

interface IImagesWithHistory {
  id: string;
  history: string[];
  file: File;
}

interface IIMageDimensions {
  width: number;
  height: number;
}

export type { IWorkingAreaDto, IImagesWithHistory, IIMageDimensions, IImageWorkingAreaDto };
