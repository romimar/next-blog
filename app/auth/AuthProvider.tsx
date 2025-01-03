'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    );
};

export default AuthProvider;
