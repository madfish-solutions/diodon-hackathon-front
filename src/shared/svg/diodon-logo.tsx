import { FC } from 'react';

import { useSvgHelper } from '@shared/hooks/use-svg-helper';

export const DiodonLogo: FC = props => {
  const { getId, getUrl } = useSvgHelper('diodon-logo');

  return (
    <svg width={128} height={128} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M126.061 62.06h-8.456a53.508 53.508 0 0 0-3.323-16.782l7.796-3.232a1.93 1.93 0 0 0 1.048-2.534 1.93 1.93 0 0 0-2.534-1.047l-7.81 3.232a54.54 54.54 0 0 0-4.667-8.197h8.805a1.944 1.944 0 0 0 1.655-2.96 64.457 64.457 0 0 0-9.271-11.74.284.284 0 0 0-.039-.066.255.255 0 0 0-.064-.038 65.024 65.024 0 0 0-11.74-9.27 1.943 1.943 0 0 0-1.965-.04c-.608.35-.996.996-.996 1.694v8.805a53.248 53.248 0 0 0-8.197-4.667l3.232-7.81a1.94 1.94 0 0 0-1.047-2.534 1.94 1.94 0 0 0-2.534 1.048l-3.232 7.796a53.13 53.13 0 0 0-16.783-3.323V1.94C65.94.866 65.073 0 64 0s-1.94.866-1.94 1.94v8.455a53.311 53.311 0 0 0-17.053 3.44l-3.271-7.913a1.93 1.93 0 0 0-2.534-1.048 1.93 1.93 0 0 0-1.048 2.534l3.284 7.94a53.351 53.351 0 0 0-7.925 4.55v-8.805a1.94 1.94 0 0 0-.996-1.693 1.914 1.914 0 0 0-1.965.038c-8.56 5.25-15.851 12.555-21.114 21.114a1.944 1.944 0 0 0 1.655 2.96h8.805a54.697 54.697 0 0 0-4.965 8.831l-8.287-3.426a1.94 1.94 0 0 0-2.534 1.047c-.414.983.064 2.12 1.047 2.535l8.326 3.452a52.776 52.776 0 0 0-3.09 16.11H1.94C.866 62.06 0 62.927 0 64s.866 1.94 1.94 1.94h8.455a53.494 53.494 0 0 0 3.323 16.782l-7.796 3.232a1.93 1.93 0 0 0-1.048 2.534 1.945 1.945 0 0 0 2.534 1.06l7.81-3.232a53.844 53.844 0 0 0 9.516 14.209l-6 5.999a1.928 1.928 0 0 0 0 2.741c.375.375.88.569 1.371.569a1.95 1.95 0 0 0 1.37-.569l6-5.999a53.747 53.747 0 0 0 14.209 9.516l-3.232 7.81a1.94 1.94 0 0 0 1.047 2.534c.246.103.491.142.737.142.763 0 1.487-.453 1.797-1.203l3.233-7.796a53.591 53.591 0 0 0 16.782 3.336v8.456c0 1.073.866 1.939 1.94 1.939a1.937 1.937 0 0 0 1.939-1.939v-8.456a53.347 53.347 0 0 0 16.51-3.22l3.814 9.219a1.945 1.945 0 0 0 1.797 1.202c.246 0 .505-.051.737-.142a1.93 1.93 0 0 0 1.048-2.534l-3.814-9.218a53.713 53.713 0 0 0 14.093-9.271l6.968 6.969c.375.375.88.569 1.371.569a1.95 1.95 0 0 0 1.37-.569 1.927 1.927 0 0 0 0-2.741l-6.956-6.956a54.032 54.032 0 0 0 9.607-13.963l8.869 3.671c.246.104.492.143.737.143.763 0 1.487-.453 1.798-1.203a1.941 1.941 0 0 0-1.048-2.534l-8.818-3.659a53.218 53.218 0 0 0 3.595-17.441h8.456a1.937 1.937 0 0 0 1.939-1.94 1.926 1.926 0 0 0-1.939-1.926ZM64 113.779c-27.449 0-49.778-22.33-49.778-49.778 0-27.449 22.33-49.778 49.778-49.778 27.449 0 49.778 22.33 49.778 49.778 0 27.449-22.33 49.778-49.778 49.778Z"
        fill={getUrl('a')}
      />
      <path
        d="M47.942 88.255a1.954 1.954 0 0 0-2.69.556l-5.701 8.624a1.938 1.938 0 0 0 1.616 3.013c.633 0 1.241-.311 1.616-.867l5.702-8.623a1.952 1.952 0 0 0-.543-2.703Z"
        fill={getUrl('b')}
      />
      <path
        d="M80.058 39.745a1.945 1.945 0 0 0 2.69-.543l5.714-8.624a1.94 1.94 0 1 0-3.232-2.146l-5.715 8.623a1.939 1.939 0 0 0 .543 2.69Z"
        fill={getUrl('c')}
      />
      <path
        d="M74.343 62.06H53.657c-1.074 0-1.94.867-1.94 1.94 0 6.775 5.508 12.283 12.283 12.283 6.775 0 12.283-5.508 12.283-12.283 0-1.073-.866-1.94-1.94-1.94Z"
        fill={getUrl('d')}
      />
      <path d="M38.141 58.182a7.111 7.111 0 1 0 0-14.222 7.111 7.111 0 0 0 0 14.222Z" fill={getUrl('e')} />
      <path d="M89.859 58.182a7.111 7.111 0 1 0 0-14.222 7.111 7.111 0 0 0 0 14.222Z" fill={getUrl('f')} />
      <path
        d="m99.569 85.217-8.624-5.702a1.939 1.939 0 0 0-2.69.543 1.954 1.954 0 0 0 .556 2.69l8.624 5.701a1.944 1.944 0 0 0 2.689-.543 1.953 1.953 0 0 0-.555-2.689Z"
        fill={getUrl('g')}
      />
      <path
        d="M35.49 69.805c-.206-1.047-1.227-1.72-2.288-1.513l-10.136 2.056c-1.047.22-1.733 1.242-1.513 2.289a1.936 1.936 0 0 0 2.289 1.513l10.136-2.056a1.951 1.951 0 0 0 1.513-2.289Z"
        fill={getUrl('h')}
      />
      <path
        d="M72.08 94.022c-.206-1.047-1.227-1.72-2.288-1.513-1.047.22-1.732 1.241-1.512 2.289l2.055 10.136a1.936 1.936 0 0 0 2.289 1.513 1.943 1.943 0 0 0 1.513-2.289L72.08 94.022Z"
        fill={getUrl('i')}
      />
      <path
        d="M55.92 33.978a1.935 1.935 0 0 0 2.288 1.513c1.047-.22 1.732-1.241 1.512-2.289l-2.068-10.136a1.935 1.935 0 0 0-2.289-1.513 1.943 1.943 0 0 0-1.513 2.289l2.07 10.136Z"
        fill={getUrl('j')}
      />
      <path
        d="M58.453 92.56a1.933 1.933 0 0 0-2.275 1.54L54.2 104.248a1.939 1.939 0 0 0 1.538 2.275c.13.026.246.039.375.039.905 0 1.72-.646 1.9-1.564l1.979-10.15a1.959 1.959 0 0 0-1.539-2.288Z"
        fill={getUrl('k')}
      />
      <path
        d="M69.547 35.452c.129.026.245.039.375.039.905 0 1.72-.647 1.9-1.565L73.8 23.777a1.94 1.94 0 0 0-1.538-2.276 1.933 1.933 0 0 0-2.276 1.539l-1.978 10.15a1.953 1.953 0 0 0 1.539 2.262Z"
        fill={getUrl('l')}
      />
      <path
        d="m104.986 69.986-10.15-1.978a1.94 1.94 0 0 0-2.275 1.539 1.94 1.94 0 0 0 1.538 2.275l10.15 1.978c.129.026.246.04.375.04.905 0 1.719-.647 1.9-1.565a1.965 1.965 0 0 0-1.538-2.289Z"
        fill={getUrl('m')}
      />
      <path
        d="M39.874 80.265a1.924 1.924 0 0 0-2.69-.517l-8.571 5.78a1.924 1.924 0 0 0-.518 2.689c.375.555.983.853 1.617.853.375 0 .75-.103 1.086-.336l8.572-5.78a1.93 1.93 0 0 0 .504-2.689Z"
        fill={getUrl('n')}
      />
      <path
        d="M82.967 88.643a1.924 1.924 0 0 0-2.689-.517 1.924 1.924 0 0 0-.517 2.69l5.78 8.572c.374.555.982.853 1.615.853.375 0 .75-.104 1.087-.336a1.924 1.924 0 0 0 .517-2.69l-5.793-8.572Z"
        fill={getUrl('o')}
      />
      <path
        d="M45.046 39.357c.375.556.982.853 1.616.853.375 0 .75-.103 1.086-.336a1.924 1.924 0 0 0 .517-2.69l-5.78-8.571a1.924 1.924 0 0 0-2.689-.518 1.924 1.924 0 0 0-.517 2.69l5.767 8.572Z"
        fill={getUrl('p')}
      />
      <defs>
        <linearGradient id={getId('a')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('b')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('c')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('d')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('e')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('f')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('g')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('h')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('i')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('j')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('k')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('l')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('m')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('n')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('o')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
        <linearGradient id={getId('p')} x1={128} y1={0} x2={0} y2={128} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE600" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.32} />
        </linearGradient>
      </defs>
    </svg>
  );
};
