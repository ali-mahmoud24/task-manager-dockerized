import { NextPage } from 'next';
import Head from 'next/head';

import SignupForm from '../components/Auth/SigupForm';

import { SignedInProtectedRoute } from '../utils/auth-routes';

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Task Manager || Signup</title>
        <meta name="description" content="Create a new account and join us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignupForm />
    </>
  );
};

export default SignedInProtectedRoute(SignupPage);
