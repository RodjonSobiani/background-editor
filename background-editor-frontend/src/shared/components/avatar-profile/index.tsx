import { mdiDelete, mdiPencil } from '@mdi/js';
import Dropdown from '@shared/components/dropdown';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { DropdownAction } from '../dropdown-action';
import { useUpdateAvatarPresenter } from '@entities/cases/profile/update-avatar/presenter';

export const AvatarProfile = ({ name, avatarUrl }: { name: string; avatarUrl?: string }) => {
  const t = useTranslations('profilePage.profile.actions');
  const { ref, handleSubmit, handleRemove } = useUpdateAvatarPresenter();

  return (
    <div className="flex flex-col items-center">
      <Image
        priority={true}
        src={avatarUrl ?? '/assets/avatar.png'}
        alt="avatar"
        width={80}
        height={80}
        className="mb-4 h-20 w-20 rounded-full bg-contain object-cover"
      />
      <span className="mb-1 text-[22px] font-medium">{name}</span>

      <Dropdown
        className="z-10"
        position="center"
        options={[
          {
            value: 'edit',
            label: <DropdownAction pathIcon={mdiPencil} caption={t('edit')} />,
            onClick: () => ref.current?.click()
          },
          {
            value: 'remove',
            label: <DropdownAction state="error" pathIcon={mdiDelete} caption={t('remove')} />,
            onClick: handleRemove
          }
        ]}
        labelComponent={<button className="cursor-pointer">{t('changePhoto')}</button>}
      />
      <input onChange={handleSubmit} className={'hidden'} type={'file'} ref={ref} />
    </div>
  );
};
