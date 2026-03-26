import { AuthService } from '@shared/api/auth.service';
import Dropdown from '@shared/components/dropdown';
import { DropdownAction } from '@shared/components/dropdown-action';
import { useAuth } from '@shared/providers/client/auth-provider';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const ProfileDropdownMenu = ({ name, avatarUrl }: { name: string; avatarUrl: string }) => {
  const t = useTranslations('header.dropdownMenu');
  const router = useRouter();

  const auth = useAuth();

  const handleProfileClick = () => router.push('/profile');
  const handleLogoutClick = () => AuthService.logout(auth.logout);

  return (
    <Dropdown
      className="z-10"
      position="right"
      options={[
        {
          value: 'edit',
          label: <DropdownAction caption={t('profile')} onClick={handleProfileClick} />
        },
        {
          value: 'remove',
          label: <DropdownAction state="error" caption={t('logout')} onClick={handleLogoutClick} />
        }
      ]}
      labelComponent={
        <div className="flex cursor-pointer items-center gap-2">
          <span>{name}</span>

          <Image
            priority={true}
            src={avatarUrl ?? '/assets/avatar.png'}
            alt="avatar"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-contain object-cover"
          />
        </div>
      }
    />
  );
};
