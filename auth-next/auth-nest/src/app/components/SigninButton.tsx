import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const SigninButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user} <br />
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <Link
          href={'/api/auth/signout'}
          className="flex gap-4 ml-auto text-red-600"
        >Sign out</Link>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      {/* <button onClick={() => signIn()}>Sign in</button> */}
      <Link
        href={'/api/auth/signin'}
        className="flex gap-4 ml-auto text-red-600"
      >
        Sign in
      </Link>
      <Link
        href={'/signup'}
        className="flex gap-4 ml-auto text-red-600"
      >
        Sign up
      </Link>
    </>
  );
};

export default SigninButton;
