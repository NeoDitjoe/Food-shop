import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/database/auth";

import { connectToDatabase } from "@/database/Database";
import NextAuth from "next-auth";

export default NextAuth({

    session : {
        jwt: true
    },
    

providers: [
  CredentialsProvider({

    async authorize(credentials) {
        
        const client = await connectToDatabase()
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
]

})