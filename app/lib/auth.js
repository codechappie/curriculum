import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { generateUsername } from '../../lib/Utils.js';
import dbConnect from '../../lib/connect-db.js';
import User from '../../models/User.js';

export const authOptions = {
    // Secret for Next-auth, without this JWT encryption/decryption won't work
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
            // console.log(user, account, profile)
            if (account.provider === 'github' || account.provider === 'google') {
                await dbConnect();
                // check the user on your database and return true if is allowed to signIn
                let found = await User.findOne({
                    id: user.id,
                });
                console.log("FOUND", found)
                if (!found) {
                    // User.create()
                    try {
                        const username = generateUsername(user.name);
                        // TODO: removeprofile and bio as required
                        User.create({
                            id: user.id,
                            username,
                            name: user.name,
                            profileImage: "test",
                            bio: "test",
                        }).then(data => data.id && true)
                            .then(() => {

                                return false;
                            })

                    } catch (error) {
                        return false;
                    }
                } else {

                    return true
                };
            }
        },
    },
};