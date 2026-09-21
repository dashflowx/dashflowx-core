import { Tooltip } from '@/components';
import { TypographyComp } from '@/components/Typography';
import { cn } from '@/lib/utils';
import type { iDfxMenu } from '../types';

interface iDfxMenuList {
  menuArrays: iDfxMenu[];
  library: 'react' | 'next';
  type: any;
  className?: string;
  showText?: boolean;
  showIcon?: boolean;
  tooltipClassName?: string;
  navClassName?: string;
}

export const MenuListTwo = ({
  menuArrays,
  library,
  type,
  showText = true,
  showIcon = true,
  tooltipClassName,
  className,
  navClassName,
}: iDfxMenuList) => {
  if (library === 'react') {
    return (
      <nav className={cn('flex', navClassName)}>
        {menuArrays.map((menu) => {
          if (!showText) {
            return (
              <Tooltip
                tooltipContent={
                  <span className={'mx-4 font-medium whitespace-nowrap'}>
                    {menu.title}
                  </span>
                }
                tooltipTrigger={
                  <TypographyComp
                    className={cn(
                      menu.active
                        ? 'flex items-center px-4 py-2 mt-5 text-primary-light border-primary-light transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
                        : 'flex items-center px-4 py-2 mt-5 text-gray-300 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                      menu.disabled && 'opacity-50 cursor-not-allowed',
                      className
                    )}
                    as={type}
                    to={menu.path}
                    onClick={menu.onClick}
                  >
                    {showIcon && menu.menuIcon}
                    {menu.badge && (
                      <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {menu.badge}
                      </span>
                    )}
                  </TypographyComp>
                }
                side="right"
                className={cn('ml-8', tooltipClassName)}
              />
            );
          }
          if (showText) {
            return (
              <TypographyComp
                className={cn(
                  menu.active
                    ? 'flex items-center px-4 py-2 mt-5 text-primary-light border-primary-light transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
                    : 'flex items-center px-4 py-2 mt-5 text-gray-300 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                  menu.disabled && 'opacity-50 cursor-not-allowed',
                  className
                )}
                as={type}
                to={menu.path}
                onClick={menu.onClick}
              >
                {showIcon && menu.menuIcon}
                <span className={'font-medium ml-2'}>{menu.title}</span>
                {menu.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {menu.badge}
                  </span>
                )}
              </TypographyComp>
            );
          }
        })}
      </nav>
    );
  }
  if (library === 'next') {
    return (
      <nav className={cn('flex', navClassName)} >
        {menuArrays.map((menu) => {
          if (!showText) {
            return (
              <Tooltip
                tooltipContent={
                  <span className={'mx-4 font-medium whitespace-nowrap'}>
                    {menu.title}
                  </span>
                }
                tooltipTrigger={
                  <TypographyComp
                    className={cn(
                      menu.active
                        ? 'flex items-center px-4 py-2 mt-5 text-primary-light border-primary-light transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
                        : 'flex items-center px-4 py-2 mt-5 text-gray-300 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                      menu.disabled && 'opacity-50 cursor-not-allowed',
                      className
                    )}
                    as={type}
                    href={menu.path}
                    onClick={menu.onClick}
                  >
                    {showIcon && menu.menuIcon}
                    {menu.badge && (
                      <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {menu.badge}
                      </span>
                    )}
                  </TypographyComp>
                }
                side="right"
                className={cn('absolute top-0 left-0 ml-8', tooltipClassName)}
              />
            );
          }
          if (showText) {
            return (
              <TypographyComp
                className={cn(
                  menu.active
                    ? 'flex items-center px-4 py-2 mt-5 text-primary-light border-primary-light transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
                    : 'flex items-center px-4 py-2 mt-5 text-gray-300 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                  menu.disabled && 'opacity-50 cursor-not-allowed',
                  className
                )}
                as={type}
                href={menu.path}
                onClick={menu.onClick}
              >
                {showIcon && menu.menuIcon}
                <span className={'font-medium'}>{menu.title}</span>
                {menu.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {menu.badge}
                  </span>
                )}
              </TypographyComp>
            );
          }
        })}
      </nav>
    );
  }
};
