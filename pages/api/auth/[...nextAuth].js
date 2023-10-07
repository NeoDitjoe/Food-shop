import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/database/auth";

import { connectDatabase } from "@/database/Database";
import NextAuth from "next-auth";

export default NextAuth({

    session : {
        jwt: true
    },
    secret: process.env.NEXTAUTH_SECRET,
    

    providers: [
    CredentialsProvider({

        async authorize(credentials) {
            
            const client = await connectDatabase('authentication')
            const userscollection = client.db().collection('users')
            const user = await userscollection.findOne({ email: credentials.email})
            
            if (!user){
                client.close()
                throw new Error('User not found!')
            }

            const isValid = await verifyPassword(credentials.password, user.password)

            if(!isValid){
                client.close()
                throw new Error('Could not log you in')
            }
            client.close()
            return { email: [user.email, user.username] }
        }
    })
    ],

    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user',
      },

})