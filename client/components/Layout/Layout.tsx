import { ReactNode } from 'react';

import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navigation />
      <main style={{ marginTop: '5rem' }}>{children}</main>
    </>
  );
};

export default Layout;
