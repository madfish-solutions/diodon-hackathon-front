import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  id?: string;
  className?: string;
  size?: number;
}
