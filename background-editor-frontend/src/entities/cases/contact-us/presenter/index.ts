import { useForm } from 'react-hook-form';
import { contactUsSchema } from '@shared/utils/validation/schemas/contact-us';
import { JoiResolverI18n } from '@shared/utils';
import { IContactUsPort } from '@shared/api/contact-us';
import { useContactUsUseCase } from '@entities/cases/contact-us';
import { useLocale } from 'next-intl';

export const useContactUsPresenter = () => {
  const { mutateAsync } = useContactUsUseCase();
  const locale = useLocale();

  const contactUsForm = useForm<IContactUsPort>({
    resolver: JoiResolverI18n(contactUsSchema)
  });

  const formHandleSubmit = (data: IContactUsPort) => {
    void mutateAsync({ ...data, locale });
  };

  return {
    formHandleSubmit,
    contactUsForm
  };
};
