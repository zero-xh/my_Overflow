interface SignInWithOAuthParams {
    provider: 'github',
    providerAccountId: string,
    user: {
        email: string,
        name: string,
        image: string
    }
}

interface AuthCredentials {
    name: string;
    username: string;
    email: string;
    password: string;
}