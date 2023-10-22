import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/database/auth";

import { connectDatabase } from "@/database/Database";
import NextAuth from "next-auth";
import StateContext from "@/usecontext/stateContext";

export default NextAuth({

    session : {
        jwt: true
    },
    
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({

            async authorize(credentials) {
                
                const client = await connectDatabase()
                const userscollection = client.db('authentication').collection('users')
                const user = await userscollection.findOne({ email: credentials.email})
                
                if (!user){
                    client.close()
                    throw new Error('User not found!')
                }

                const isValid = await verifyPassword(credentials.password, user.password)

                if(!isValid){
                    client.close()
                    throw new Error('Incorrect Password')
                }
                client.close()
                return { email: [user.email, user.username] }
            }
        })
    ],
    

})