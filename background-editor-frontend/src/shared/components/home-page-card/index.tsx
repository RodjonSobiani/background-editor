import React, { ReactElement } from 'react';
import CardBackgroundImage from '@shared/assets/images/background';

interface IHomePageCardProps {
  title: string;
  description: string;
  image?: ReactElement;
  dark?: boolean;
  backgroundOffsetX?: string;
  backgroundOffsetY?: string;
  backgroundRotation?: string;
}

const HomePageCard = ({
  title,
  description,
  image,
  dark = true,
  backgroundOffsetX = '0',
  backgroundOffsetY = '0',
  backgroundRotation = '0'
}: IHomePageCardProps) => {
  const backgroundStyles = dark
    ? {
        backgroundSize: 'cover',
        top: `${backgroundOffsetY}`,
        left: `${backgroundOffsetX}`,
        backgroundRepeat: 'no-repeat',
        transform: `rotate(${backgroundRotation}) scale(1)`
      }
    : {};

  return (
    <div className="card-wrapper">
      <div className={`card-background ${dark ? 'card-background--dark' : 'card-background--light'}`}>
        <div className="absolute inset-0" style={backgroundStyles}>
          {dark ? <CardBackgroundImage className={'text-card-bg'} /> : null}
        </div>

        <div className="card-text-wrapper">
          <h1 className="card-title">{title}</h1>
          <h3 className="card-description">{description}</h3>
        </div>

        {image && <div className="relative">{image}</div>}
      </div>
    </div>
  );
};

export default HomePageCard;
