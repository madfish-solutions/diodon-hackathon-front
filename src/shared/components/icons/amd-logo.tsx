import { FC } from 'react';

import { IconProps } from '../../types';

export const AmdLogo: FC<IconProps> = props => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g clipPath="url(#a)">
      <rect width={48} height={48} rx={24} fill="#000" />
      <path fill="url(#b)" d="M-3 4h56v56H-3z" />
      <path fill="#000" d="M1 42h46v14H1z" />
    </g>
    <defs>
      <clipPath id="a">
        <rect width={48} height={48} rx={24} fill="#fff" />
      </clipPath>
      <pattern id="b" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <use xlinkHref="#c" transform="scale(.00333)" />
      </pattern>
      <image
        id="c"
        width={300}
        height={300}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
