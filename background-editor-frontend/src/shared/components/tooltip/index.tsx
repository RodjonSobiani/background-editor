import { HTMLAttributes, ReactNode, useEffect, useMemo, useState } from 'react';

interface ITooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  position?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'rightTop'
    | 'rightCenter'
    | 'rightBottom'
    | 'bottomRight'
    | 'bottomCenter'
    | 'bottomLeft'
    | 'leftBottom'
    | 'leftCenter'
    | 'leftTop';
  children: ReactNode;
  showType?: 'hover' | 'click';
}

export const Tooltip = ({
  position = 'topCenter',
  showType = 'hover',
  children,
  content
}: ITooltipProps): ReactNode => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside() {
      if (showType === 'click') {
        onMouseLeave();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const onMouseEnter = () => {
    setIsVisible(true);
  };
  const onMouseLeave = () => {
    setIsVisible(false);
  };

  const getPositionClasses = useMemo(() => {
    switch (position) {
      case 'topLeft':
        return 'tooltip-content-top-left';
      case 'topCenter':
        return 'tooltip-content-top-center';
      case 'topRight':
        return 'tooltip-content-top-right';
      case 'rightTop':
        return 'tooltip-content-right-top';
      case 'rightCenter':
        return 'tooltip-content-right-center';
      case 'rightBottom':
        return 'tooltip-content-right-bottom';
      case 'bottomRight':
        return 'tooltip-content-bottom-right';
      case 'bottomCenter':
        return 'tooltip-content-bottom-center';
      case 'bottomLeft':
        return 'tooltip-content-bottom-left';
      case 'leftBottom':
        return 'tooltip-content-left-bottom';
      case 'leftCenter':
        return 'tooltip-content-left-center';
      case 'leftTop':
        return 'tooltip-content-left-top';
      default:
        return 'tooltip-content-top-center';
    }
  }, [position]);

  const showTypeProps = useMemo(() => {
    switch (showType) {
      case 'click':
        return {
          onClick: onMouseEnter
        };
      case 'hover':
      default:
        return {
          onMouseEnter,
          onMouseLeave
        };
    }
  }, [showType]);

  return (
    <div className="tooltip-container" {...showTypeProps}>
      {children}
      {isVisible && (
        <div className={`body-12px-golos-medium tooltip-content z-100 ${getPositionClasses}`}>
          {content}
          <div className={'tooltip-content-arrow'} />
        </div>
      )}
    </div>
  );
};
