import {
    handleAuth, handleCallback, handleLogin, handleLogout,
} from '@auth0/nextjs-auth0';

export const GET = handleAuth();
