import { FC } from 'react';

import { IconProps } from './svg-props';

export const DownIcon: FC<IconProps> = ({ ...props }) => (
  <svg
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path stroke="#fff" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" strokeWidth={2} />
  </svg>
);
