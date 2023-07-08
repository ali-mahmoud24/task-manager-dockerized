import { NextPage } from 'next';
import Head from 'next/head';

import LoginForm from '../components/Auth/LoginForm';

import { SignedInProtectedRoute } from '../utils/auth-routes';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Task Manager || Login</title>
        <meta name="description" content="Login to increase productivity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginForm />
    </>
  );
};

export default SignedInProtectedRoute(LoginPage);
