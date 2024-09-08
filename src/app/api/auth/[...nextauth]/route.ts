import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import createUser from '../../../actions/createUser';

const providers = [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
]
const handler = NextAuth({
    providers: providers,
    callbacks: {
        async signIn({ user, account }: any) {
            console.log("SignIn+++++++++++++", user, account);
            const {email, image, name} = user;
            const {provider,providerAccountId } = account;
            const userData = {
                email: email,
                image:image,
                name: name,
                provider: provider,
                providerAccountId:providerAccountId,
            }
            if (email) {
                await createUser(userData);
            }
            return true
        },
    }
})

export { handler as GET, handler as POST }