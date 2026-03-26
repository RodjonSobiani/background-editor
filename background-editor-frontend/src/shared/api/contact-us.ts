import { API_HTTPS_SERVICES } from '@shared/lib/axios';
import { AxiosResponse } from 'axios';

export interface IContactUsPort {
  name: string;
  email: string;
  question: string;
  locale: string;
}

export type IContactUsDto = IContactUsPort;

export async function ContactUs(port: IContactUsPort): Promise<IContactUsDto> {
  const response: AxiosResponse<IContactUsDto> = await API_HTTPS_SERVICES.post('/contact-us', port);
  return response.data;
}
