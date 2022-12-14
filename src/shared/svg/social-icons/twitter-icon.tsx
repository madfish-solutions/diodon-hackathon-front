import { FC } from 'react';

interface Props {
  className?: string;
}

export const TwitterIcon: FC<Props> = ({ className }) => (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M16 0C7.173 0 0 7.173 0 16s7.173 16 16 16 16-7.173 16-16S24.827 0 16 0Zm7.152 12.341v.476c0 4.857-3.7 10.48-10.48 10.48-2.088 0-4.01-.6-5.644-1.654.29.042.58.062.869.062a7.32 7.32 0 0 0 4.568-1.57c-1.592-.042-2.956-1.117-3.431-2.564a3.81 3.81 0 0 0 1.653-.062 3.686 3.686 0 0 1-2.956-3.617v-.042a3.74 3.74 0 0 0 1.675.455 3.652 3.652 0 0 1-1.633-3.06c0-.682.186-1.302.496-1.86a10.448 10.448 0 0 0 7.607 3.845 3.807 3.807 0 0 1-.103-.848 3.688 3.688 0 0 1 3.68-3.68c1.053 0 2.025.456 2.687 1.158a7.402 7.402 0 0 0 2.335-.888 3.714 3.714 0 0 1-1.612 2.046 7.072 7.072 0 0 0 2.109-.579c-.476.745-1.117 1.385-1.82 1.902Z"
      fill="#fff"
      fillOpacity={0.64}
    />
  </svg>
);
