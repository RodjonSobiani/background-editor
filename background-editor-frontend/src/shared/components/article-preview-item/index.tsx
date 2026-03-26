import Image from 'next/image';
import Link from 'next/link';

export const ArticlePreview = ({
  title,
  imageUrl,
  publishedAt,
  className
}: {
  title: string;
  imageUrl: string;
  publishedAt: string;
  className?: string;
}) => {
  return (
    <div className={`relative flex flex-col ${className || ''}`}>
      <Image className="mb-3" src={imageUrl} alt="preview" width={340} height={225} />
      <h4 className="mb-2 font-medium">{title}</h4>
      <span className="text-secondary text-sm">{publishedAt}</span>
      <Link href="/" className="l-0 absolute top-0 h-full w-full"></Link>
    </div>
  );
};
