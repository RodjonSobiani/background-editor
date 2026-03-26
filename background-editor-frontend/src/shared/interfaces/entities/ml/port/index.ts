interface IRemoveBgPort {
  id: string;
  image_id: string;
}

interface IReplaceBgPort {
  id: string;
  image_id: string;
  background: string;
}
interface IResizeImagePort {
  input_url: string;
  scale: number;
}

interface IDonwloadArchivePort {
  image_urls: string[];
  scale: number;
}

export type { IRemoveBgPort, IReplaceBgPort, IResizeImagePort, IDonwloadArchivePort };
