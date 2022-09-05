export const isActivePath = (pathname: string, href: string) => {
  if (!href) {
    return false;
  }

  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
};
