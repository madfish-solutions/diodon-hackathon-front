import { ForwardRefExoticComponent, HTMLProps, ReactNode, RefAttributes } from 'react';

import cx from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import { CFC } from '@shared/types';
import { isUndefined } from '@shared/types/type-checks';

import styles from './button.module.scss';

export type ButtonProps = {
  loading?: boolean;
  theme?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset' | undefined;
  external?: boolean;
  themeOposite?: boolean;
  className?: string;
  innerClassName?: string;
  textClassName?: string;
  icon?: ReactNode;
  control?: ReactNode;
} & (HTMLProps<HTMLButtonElement> | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>);

const themeClass = {
  primary: styles.primary,
  secondary: styles.secondary
};

export const Button: CFC<ButtonProps> = ({
  loading,
  theme = 'primary',
  type = 'button',
  external = false,
  className,
  innerClassName,
  textClassName,
  children,
  icon,
  control,
  themeOposite,
  ...props
}) => {
  const compoundClassName = cx(className, styles.root, themeClass[theme], {
    [styles.loading]: loading
  });

  if ('href' in props && !isUndefined(props.href)) {
    const anchorProps = {
      target: external ? '_blank' : undefined,
      rel: external ? 'noreferrer noopener' : undefined,
      className: compoundClassName,
      ...(props as ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>> & { href: string })
    };

    if (anchorProps.target === '_blank') {
      return (
        <a {...anchorProps}>
          {control}
          {children}
          {icon}
        </a>
      );
    } else {
      return (
        <Link to={anchorProps.href} {...anchorProps}>
          {control}
          {children}
          {icon}
        </Link>
      );
    }
  }

  return (
    <button
      // @ts-ignore
      type={type}
      className={compoundClassName}
      {...(props as HTMLProps<HTMLButtonElement>)}
    >
      {control}
      {children}
      {icon}
    </button>
  );
};
