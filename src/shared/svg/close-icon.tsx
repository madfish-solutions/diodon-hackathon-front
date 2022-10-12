import { FC } from 'react';

import { IconProps } from './svg-props';

export const CloseIcon: FC<IconProps> = ({ onClick, className, ...props }) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2 2 18m16 0L2 2" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
  </svg>
);
