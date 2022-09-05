import { SVGProps, FC as TFC, ReactNode } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  id?: string;
  className?: string;
  size?: number;
}

export type Undefined<T> = T | undefined;
export type Nullable<T> = T | null;
export type Optional<T> = T | null | undefined;

export interface Constructable<T extends object = object> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any): T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CFC<P = {}> = TFC<P & { children?: ReactNode }>;
