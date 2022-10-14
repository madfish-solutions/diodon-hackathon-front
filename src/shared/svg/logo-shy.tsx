import { FC } from 'react';

import { useSvgHelper } from '../hooks/use-svg-helper';
import { IconProps } from './svg-props';

export const LogoShyIcon: FC<IconProps> = ({ ...props }) => {
  const { getId, getUrl } = useSvgHelper('LogoRedIcon');

  return (
    <svg
      width={props.size || 64}
      height={props.size || 64}
      viewBox="0 0 518 518"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={getUrl('a')}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M473.419 251.268h33.823c4.293 0 7.758 3.361 7.758 7.654a7.748 7.748 0 0 1-7.758 7.759h-33.823c-.879 24.516-5.895 47.998-14.377 69.773l35.323 14.638c3.93 1.655 5.844 6.155 4.189 10.137a7.78 7.78 0 0 1-7.189 4.811c-.982 0-1.965-.156-2.948-.569l-35.478-14.69c-9.826 20.638-22.859 39.465-38.425 55.861l27.823 27.826c3.052 3 3.052 7.914 0 10.965a7.798 7.798 0 0 1-5.482 2.276 7.802 7.802 0 0 1-5.482-2.276l-27.875-27.878a214.675 214.675 0 0 1-56.372 37.085l15.257 36.878a7.72 7.72 0 0 1-4.189 10.138 8.298 8.298 0 0 1-2.948.569 7.78 7.78 0 0 1-7.189-4.811L332.8 460.536c-20.686 7.604-42.925 12.052-66.042 12.879v33.827A7.747 7.747 0 0 1 259 515a7.747 7.747 0 0 1-7.758-7.758v-33.827c-23.531-.827-46.08-5.431-67.128-13.292l-12.93 31.188a7.78 7.78 0 0 1-7.188 4.81c-.983 0-1.966-.155-2.948-.569-3.931-1.655-5.844-6.155-4.189-10.137l12.929-31.24a214.999 214.999 0 0 1-56.837-38.068l-23.997 23.999a7.8 7.8 0 0 1-5.482 2.276 7.8 7.8 0 0 1-5.482-2.276c-3.051-3-3.051-7.914 0-10.965l23.997-23.999c-15.515-16.707-28.445-35.844-38.064-56.843l-31.237 12.93a8.295 8.295 0 0 1-2.948.569 7.78 7.78 0 0 1-7.189-4.81 7.719 7.719 0 0 1 4.19-10.137l31.185-12.931c-7.861-20.999-12.516-43.602-13.343-67.136H10.758A7.747 7.747 0 0 1 3 259.026a7.747 7.747 0 0 1 7.758-7.758H44.58c.775-22.551 5.068-44.223 12.36-64.447l-33.306-13.809c-3.93-1.656-5.844-6.155-4.189-10.138 1.655-3.931 6.206-5.845 10.137-4.19l33.15 13.707a218.811 218.811 0 0 1 19.86-35.327h-35.22c-2.792 0-5.378-1.551-6.775-3.982-1.396-2.483-1.292-5.483.156-7.862 21.048-34.24 50.217-63.412 84.454-84.463 2.379-1.5 5.378-1.551 7.861-.155a7.764 7.764 0 0 1 3.982 6.776V82.6a213.329 213.329 0 0 1 31.703-18.207l-13.137-31.757a7.72 7.72 0 0 1 4.189-10.138c3.983-1.655 8.482.259 10.137 4.19l13.084 31.654c21.308-8.12 44.27-12.879 68.215-13.758V10.758A7.748 7.748 0 0 1 259 3a7.748 7.748 0 0 1 7.758 7.758v33.827c23.531.827 46.131 5.43 67.128 13.344l12.93-31.188c1.655-3.931 6.154-5.845 10.136-4.19 3.931 1.655 5.844 6.155 4.189 10.138l-12.929 31.24a213.03 213.03 0 0 1 32.789 18.672V47.378c0-2.793 1.551-5.38 3.982-6.776s5.43-1.345 7.861.104c17.015 10.447 32.789 22.964 46.959 37.085a.816.816 0 0 0 .091.036c.07.025.132.046.168.119.052.103.103.207.155.258 14.119 14.172 26.634 29.948 37.081 46.964 1.448 2.431 1.5 5.431.155 7.862a7.762 7.762 0 0 1-6.775 3.983h-35.219a217.962 217.962 0 0 1 18.67 32.792l31.237-12.931c3.982-1.655 8.482.259 10.137 4.19a7.72 7.72 0 0 1-4.189 10.137l-31.186 12.931a214.015 214.015 0 0 1 13.291 67.136Z"
          fill={getUrl('b')}
        />
      </g>
      <circle cx={155.5} cy={207.5} r={28.5} fill={getUrl('c')} />
      <path d="M231 314c0-15.464 12.984-28 29-28s29 12.536 29 28h-58Z" fill={getUrl('d')} />
      <circle cx={169} cy={216} r={10} fill="#fff" />
      <circle cx={361.5} cy={207.5} r={28.5} fill={getUrl('e')} />
      <path
        d="M195.662 354.634c-3.567-2.331-8.374-1.347-10.752 2.228l-22.847 34.558c-2.378 3.575-1.395 8.394 2.171 10.777 1.292.881 2.791 1.295 4.29 1.295 2.533 0 4.963-1.243 6.462-3.471l22.846-34.558c2.378-3.627 1.396-8.445-2.17-10.829Z"
        fill={getUrl('f')}
      />
      <path
        d="M324.06 160.239c1.293.88 2.792 1.295 4.291 1.295 2.532 0 4.962-1.244 6.461-3.471l22.847-34.558c2.377-3.575 1.395-8.394-2.171-10.777-3.567-2.383-8.374-1.399-10.752 2.176l-22.847 34.558c-2.377 3.575-1.395 8.393 2.171 10.777Z"
        fill={getUrl('g')}
      />
      <path
        d="m402.059 342.459-34.477-22.849c-3.566-2.383-8.374-1.399-10.751 2.176-2.326 3.575-1.344 8.393 2.222 10.777l34.477 22.848c1.293.881 2.792 1.296 4.291 1.296 2.532 0 4.962-1.244 6.461-3.472 2.326-3.575 1.344-8.393-2.223-10.776Z"
        fill={getUrl('h')}
      />
      <path
        d="M145.886 280.701a7.801 7.801 0 0 0-9.149-6.062l-40.525 8.238c-4.187.881-6.927 4.974-6.048 9.171.724 3.678 3.98 6.217 7.599 6.217.516 0 1.033-.052 1.55-.156l40.525-8.237c4.187-.881 6.875-4.974 6.048-9.171Z"
        fill={getUrl('i')}
      />
      <path
        d="M292.167 377.742c-.879-4.197-4.963-6.891-9.149-6.062-4.187.881-6.927 4.974-6.048 9.171l8.218 40.62c.724 3.678 3.981 6.217 7.599 6.217.517 0 1.034-.052 1.551-.155 4.186-.881 6.926-4.974 6.047-9.171l-8.218-40.62Z"
        fill={getUrl('j')}
      />
      <path
        d="M227.555 137.131c.723 3.678 3.98 6.217 7.598 6.217.517 0 1.034-.052 1.551-.156 4.187-.88 6.926-4.973 6.047-9.17l-8.27-40.62c-.879-4.197-4.962-6.943-9.149-6.062-4.187.88-6.926 4.974-6.048 9.17l8.271 40.621Z"
        fill={getUrl('k')}
      />
      <path
        d="M237.686 371.889c-4.238-.829-8.27 1.917-9.097 6.165l-7.909 40.672c-.827 4.197 1.913 8.29 6.151 9.119.517.103.982.155 1.499.155 3.619 0 6.875-2.59 7.599-6.269l7.908-40.672c.776-4.3-1.964-8.342-6.151-9.17Z"
        fill={getUrl('l')}
      />
      <path
        d="M282.035 143.038c.517.103.983.155 1.499.155 3.619 0 6.875-2.591 7.599-6.269l7.908-40.672c.827-4.197-1.912-8.29-6.151-9.119-4.187-.777-8.27 1.917-9.097 6.166l-7.909 40.672c-.775 4.144 1.965 8.238 6.151 9.067Z"
        fill={getUrl('m')}
      />
      <path
        d="m423.718 281.425-40.577-7.927c-4.187-.777-8.27 1.917-9.097 6.166-.827 4.196 1.912 8.29 6.151 9.119l40.576 7.927c.517.103.983.155 1.499.155 3.619 0 6.875-2.59 7.599-6.269.775-4.249-1.964-8.342-6.151-9.171Z"
        fill={getUrl('n')}
      />
      <path
        d="M163.407 322.615c-2.377-3.575-7.236-4.507-10.751-2.072l-34.271 23.159c-3.566 2.384-4.497 7.254-2.067 10.777a7.698 7.698 0 0 0 6.409 3.42 7.526 7.526 0 0 0 4.342-1.348l34.271-23.159c3.566-2.383 4.497-7.202 2.067-10.777Z"
        fill={getUrl('o')}
      />
      <path
        d="M335.689 356.189c-2.378-3.575-7.236-4.508-10.751-2.073-3.567 2.384-4.497 7.254-2.068 10.777l23.105 34.351a7.699 7.699 0 0 0 6.41 3.419 7.525 7.525 0 0 0 4.342-1.347c3.566-2.383 4.497-7.253 2.068-10.776l-23.106-34.351Z"
        fill={getUrl('p')}
      />
      <path
        d="M184.083 158.684a7.7 7.7 0 0 0 6.41 3.42 7.532 7.532 0 0 0 4.342-1.347c3.566-2.384 4.497-7.254 2.067-10.777l-23.105-34.351c-2.378-3.575-7.236-4.507-10.751-2.072-3.567 2.383-4.497 7.253-2.068 10.776l23.105 34.351Z"
        fill={getUrl('q')}
      />
      <ellipse cx={375.5} cy={216} rx={9.5} ry={10} fill="#fff" />
      <g filter={getUrl('r')}>
        <ellipse cx={92.5} cy={241} rx={29.5} ry={30} fill="#FE3897" fillOpacity={0.5} />
      </g>
      <g filter={getUrl('s')}>
        <circle cx={425} cy={241} r={30} fill="#FE3897" fillOpacity={0.5} />
      </g>
      <defs>
        <linearGradient
          id={getId('b')}
          x1={514.317}
          y1={100.512}
          x2={-422.271}
          y2={709.553}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="gold" />
          <stop offset={1} stopColor="#0085FF" />
        </linearGradient>
        <linearGradient
          id={getId('f')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('g')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('h')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('i')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('j')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('k')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('l')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('m')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('n')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('o')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('p')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <linearGradient
          id={getId('q')}
          x1={368.125}
          y1={147.481}
          x2={89.294}
          y2={364.956}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00" />
          <stop offset={1} stopColor="#41413A" />
        </linearGradient>
        <radialGradient
          id={getId('c')}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-133.648 128.896 60.835) scale(76.7373 58.0676)"
        >
          <stop stopColor="#366783" />
          <stop offset={1} stopColor="#3C370A" />
        </radialGradient>
        <radialGradient
          id={getId('d')}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(53.89516 54.55252 -41.3232 40.82525 241.335 325.207)"
        >
          <stop stopColor="#BE8A01" />
          <stop offset={1} stopColor="#3C370A" />
        </radialGradient>
        <radialGradient
          id={getId('e')}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-133.648 231.896 16.74) scale(76.7373 58.0676)"
        >
          <stop stopColor="#366783" />
          <stop offset={1} stopColor="#3C370A" />
        </radialGradient>
        <filter
          id={getId('a')}
          x={0.651}
          y={0.651}
          width={516.697}
          height={516.697}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={1.174} result="effect1_foregroundBlur_695_3261" />
        </filter>
        <filter
          id={getId('r')}
          x={43.135}
          y={191.135}
          width={98.73}
          height={99.73}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={9.933} result="effect1_foregroundBlur_695_3261" />
        </filter>
        <filter
          id={getId('s')}
          x={375.135}
          y={191.135}
          width={99.73}
          height={99.73}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={9.933} result="effect1_foregroundBlur_695_3261" />
        </filter>
      </defs>
    </svg>
  );
};
