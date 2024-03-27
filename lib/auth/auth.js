import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/connect-db.js';
import User from '@/models/User.js';
import { generateUsername } from '@/lib/utils';

export const authOptions = {
    secret: process.env.SECRECT,
    providers: [
        GithubProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            await dbConnect();
            let sessionIsAllowed;
            if (account.provider === 'github' || account.provider === 'google') {
                console.log(user.id)
                let found = await User.findOne({
                    id: user.id,
                });

                if (!found) {
                    try {
                        const username = generateUsername(user.name);
                        await User.create({
                            id: user.id,
                            username,
                            name: user.name,
                            profileImage: "test",
                            bio: "test",
                        }).then((data) => (data.id) && (sessionIsAllowed = true))
                            .catch(() => sessionIsAllowed = false);
                    } catch (error) {
                        sessionIsAllowed = false;
                    }
                } else sessionIsAllowed = true;

                return sessionIsAllowed;
            }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }

            return token
        },
        async session({ session, user, token }) {
            session.accessToken = token.accessToken
            session.user.id = token.id

            return session
        },
    }
};