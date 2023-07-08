import '../styles/globals.css';

import 'bootstrap/dist/css/bootstrap.css';

import { AppProps } from 'next/app';
import { useEffect } from 'react';

import Layout from '../components/Layout/Layout';

import AuthContextProvider from '../context/auth-context';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
