import { Fragment } from 'react';
import AuthForm from '../../components/auth/auth-form'
import Head from 'next/head';

function AuthPage() {
  return (
    <Fragment>
      <Head>
        <title>Buy delious food</title>
      </Head>

      <AuthForm />
    </Fragment>
  );
}

export default AuthPage;