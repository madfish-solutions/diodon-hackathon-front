import { FC, ReactNode } from 'react';

import Tippy, { TippyProps } from '@tippyjs/react';

import { Info } from '@shared/svg';

export interface TooltipProps extends TippyProps {
  content: ReactNode;
  className?: string;
}

export const Tooltip: FC<TooltipProps> = ({ content, className, ...props }) => {
  return (
    <Tippy duration={0} {...props} content={content}>
      <span>
        <Info size={16} />
      </span>
    </Tippy>
  );
};
