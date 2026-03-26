import { ArrowRightIcon } from '@shared/components/icons/arrow-right-icon';
import Image from 'next/image';

export const MobileProfilePreview = ({
  name,
  avatarUrl,
  onClick
}: {
  name: string;
  avatarUrl: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="border-light-gray flex cursor-pointer items-center justify-between rounded-3xl border px-4 py-3">
    <div className="flex cursor-pointer items-center gap-3">
      <Image
        priority={true}
        src={avatarUrl ?? '/assets/avatar.png'}
        alt="avatar"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full bg-contain object-cover"
      />

      <span>{name}</span>
    </div>

    <ArrowRightIcon className="text-icon" />
  </div>
);
