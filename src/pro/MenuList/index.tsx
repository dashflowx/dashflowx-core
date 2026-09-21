import { MenuListComp } from './variants/Basic';
import { MenuListOne } from './variants/MenuListOne';
import { MenuListTwo } from './variants/MenuListTwo';
import type { iDfxMenu } from './types';

interface iMenuList {
  menuArrays: iDfxMenu[];
  library: 'react' | 'next';
  type: React.ElementType;
  variant: 'basic' | 'one' | 'two';
  className?: string;
  showText?: boolean;
  showIcon?: boolean;
  tooltipClassName?: string;
  navClassName?: string;
}

const MenuList = ({
  menuArrays,
  library,
  type,
  variant,
  className,
  showText,
  showIcon,
  tooltipClassName,
  navClassName,
}: iMenuList) => {
  if (variant === 'basic') {
    return (
      <MenuListComp
        menuArrays={menuArrays}
        library={library}
        type={type}
        className={className}
        showText={showText}
        showIcon={showIcon}
        tooltipClassName={tooltipClassName}
        navClassName={navClassName}
      />
    );
  }
  if (variant === 'one') {
    return (
      <MenuListOne
        menuArrays={menuArrays}
        library={library}
        type={type}
        className={className}
        showText={showText}
        showIcon={showIcon}
        tooltipClassName={tooltipClassName}
        navClassName={navClassName}
      />
    );
  }
  if (variant === 'two') {
    return (
      <MenuListTwo
        menuArrays={menuArrays}
        library={library}
        type={type}
        className={className}
        showText={showText}
        showIcon={showIcon}
        tooltipClassName={tooltipClassName}
        navClassName={navClassName}
      />
    );
  }
  return null;
};

export { MenuList, MenuListComp, MenuListOne };
export type { iDfxMenu } from './types';