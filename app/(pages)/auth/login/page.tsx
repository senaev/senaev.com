'use client';

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

function Auth0Layout() {
    const {
        user, error, isLoading,
    } = useUser();

    if (isLoading) return <div>
        {'Loading...'}
    </div>;
    if (error) return <div>
        {error.message}
    </div>;

    if (!user) {
        return (
            <div >
                <h1 >
                    {'Welcome'}
                </h1>
                <div >
                    <a href={'/api/auth/login'} >
                        {'Log In'}
                    </a>
                </div>
            </div>
        );
    }

    console.log('user', user);

    return <div>
        <img
            src={user.picture ?? undefined}
            alt={user.name ?? undefined}
        />
        <h2>
            {user.name}
        </h2>
        <p>
            {user.email}
        </p>
        <a href={'/api/auth/logout'}>
            {'Log Out'}
        </a>
    </div>;
}

export default function Page() {
    return (
        <UserProvider>
            <Auth0Layout />
        </UserProvider>
    );
}
