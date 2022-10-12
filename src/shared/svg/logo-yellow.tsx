import { FC } from 'react';

import { IconProps } from './svg-props';

export const LogoYellowIcon: FC<IconProps> = ({ ...props }) => (
  <svg width={props.size || 64} height={props.size || 64} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M58.802 31.03h4.228c.537 0 .97.427.97.963 0 .537-.433.97-.97.97h-4.228c-.11 3.065-.736 6-1.797 8.721l4.41 1.83a.97.97 0 0 1-.376 1.868.934.934 0 0 1-.368-.071l-4.435-1.836a27.015 27.015 0 0 1-4.803 6.982l3.478 3.477a.964.964 0 0 1 0 1.371.975.975 0 0 1-.686.285.976.976 0 0 1-.685-.285l-3.484-3.484a26.839 26.839 0 0 1-7.047 4.635l1.907 4.61a.965.965 0 0 1-.892 1.337.972.972 0 0 1-.898-.601l-1.907-4.61a26.677 26.677 0 0 1-8.256 1.61v4.228c0 .537-.433.97-.97.97a.968.968 0 0 1-.97-.97v-4.228a26.787 26.787 0 0 1-8.39-1.667l-1.616 3.898a.973.973 0 0 1-1.267.53.97.97 0 0 1-.524-1.267l1.616-3.905a26.872 26.872 0 0 1-7.105-4.758l-3 3a.975.975 0 0 1-.684.284.975.975 0 0 1-.686-.284.964.964 0 0 1 0-1.37l3-3a26.925 26.925 0 0 1-4.758-7.105l-3.905 1.616a.973.973 0 0 1-.743-1.797l3.898-1.616a26.747 26.747 0 0 1-1.661-8.391H.97A.968.968 0 0 1 0 32c0-.537.433-.97.97-.97h4.228a26.389 26.389 0 0 1 1.545-8.055L2.579 21.25a.97.97 0 0 1 .743-1.79l4.145 1.713a27.345 27.345 0 0 1 2.482-4.416H5.547a.97.97 0 0 1-.828-1.48A32.245 32.245 0 0 1 15.276 4.719a.957.957 0 0 1 .983-.02.97.97 0 0 1 .497.848v4.402a26.67 26.67 0 0 1 3.963-2.275l-1.642-3.97a.965.965 0 0 1 .524-1.267.965.965 0 0 1 1.267.524l1.635 3.956a26.658 26.658 0 0 1 8.527-1.72V.97c0-.537.433-.97.97-.97.537 0 .97.433.97.97v4.228c2.941.103 5.766.678 8.39 1.661l1.617-3.898a.97.97 0 0 1 1.79.743L43.152 7.61a26.63 26.63 0 0 1 4.1 2.334V5.54a.972.972 0 0 1 1.48-.827 32.507 32.507 0 0 1 5.87 4.635.136.136 0 0 1 .032.02.164.164 0 0 1 .02.032 32.225 32.225 0 0 1 4.634 5.87.972.972 0 0 1-.827 1.48h-4.403a27.249 27.249 0 0 1 2.334 4.099l3.905-1.617a.965.965 0 0 1 1.267.524.965.965 0 0 1-.524 1.267l-3.898 1.616a26.745 26.745 0 0 1 1.661 8.391Zm-23.93-13.35a.976.976 0 0 1-.957-1.15l.989-5.076a.966.966 0 0 1 1.138-.769.97.97 0 0 1 .769 1.138l-.99 5.075a.974.974 0 0 1-.95.782Zm-6.052.02a.968.968 0 0 1-.95-.776l-1.034-5.069a.97.97 0 0 1 1.9-.388l1.035 5.069a.97.97 0 0 1-.95 1.163Zm11.12 2.107a.973.973 0 0 0 1.345-.271l2.857-4.313a.97.97 0 1 0-1.616-1.073l-2.858 4.312a.97.97 0 0 0 .272 1.345ZM23.882 44.062a.977.977 0 0 0-1.345.278l-2.851 4.312a.97.97 0 1 0 1.616 1.073l2.851-4.312a.976.976 0 0 0-.271-1.35Zm2.857-13.097h10.343c.537 0 .97.433.97.97a6.147 6.147 0 0 1-6.141 6.14 6.147 6.147 0 0 1-6.142-6.14c0-.537.433-.97.97-.97Zm-7.758-1.94a3.556 3.556 0 1 0 0-7.11 3.556 3.556 0 0 0 0 7.11Zm29.414-3.555a3.556 3.556 0 1 1-7.11 0 3.556 3.556 0 0 1 7.11 0Zm1.3 17.073-4.312-2.851a.97.97 0 0 0-1.345.272.977.977 0 0 0 .278 1.344l4.312 2.851a.973.973 0 0 0 1.345-.271.977.977 0 0 0-.278-1.345ZM16.512 34.08a.97.97 0 1 1 .388 1.9l-5.07 1.03a.968.968 0 0 1-1.144-.756.97.97 0 0 1 .757-1.145l5.068-1.027ZM35.95 46.945a.969.969 0 1 0-1.9.388l1.027 5.068a.968.968 0 0 0 1.145.757.97.97 0 0 0 .756-1.144l-1.028-5.069Zm-6.814-.73a.966.966 0 0 0-1.137.77l-.99 5.074a.97.97 0 0 0 .957 1.157c.453 0 .86-.323.95-.782l.99-5.075a.98.98 0 0 0-.77-1.144Zm23.267-11.288-5.075-.989a.97.97 0 0 0-1.138.77.97.97 0 0 0 .77 1.138l5.074.989a.974.974 0 0 0 1.138-.763.983.983 0 0 0-.77-1.145Zm-33.901 4.881a.962.962 0 0 1 1.345.259.965.965 0 0 1-.252 1.344l-4.287 2.89a.943.943 0 0 1-.543.168.967.967 0 0 1-.808-.426.962.962 0 0 1 .259-1.345l4.286-2.89Zm22.891 4.448a.962.962 0 0 0-1.344-.259.962.962 0 0 0-.259 1.345l2.89 4.286a.966.966 0 0 0 .808.427.943.943 0 0 0 .543-.168.962.962 0 0 0 .258-1.345l-2.896-4.286ZM23.242 20.039a.966.966 0 0 1-.809-.426l-2.883-4.286a.962.962 0 0 1 .259-1.345.962.962 0 0 1 1.345.259l2.89 4.286a.962.962 0 0 1-.26 1.344.943.943 0 0 1-.542.168Z"
      fill="gold"
    />
  </svg>
);
