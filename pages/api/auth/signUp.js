import { connectDatabase } from "@/database/Database";
import hashPassword from "@/database/auth";

export default async function handler( req, res){
    if( req.method === 'POST'){
        const { username, email, password } = req.body

        if( !email || !email.includes('@') || !username || username.includes(' ') || !password || !password.length >= 8 ){
            res.status(400).json({ message: 'Invalid Input: password should include atleast 8 characters and Username should not inlude space'})
            return;
        }

        const client = await connectDatabase('authentication')
        
        const db = client.db()

        const existingUserEmail = await db.collection('users').findOne({ email: email })
        const existingUsername = await db.collection('users').findOne({ username: username })

        if(existingUserEmail){
            res.status(400).json({ message : 'email is already in use'})
            client.close()
            return;
        }

        if(existingUsername){
            res.status(400).json({ message : 'username is already in use'})
            client.close()
            return;
        }

        const hashedPassword = await hashPassword(password)

        const result = await db.collection('users').insertOne({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.status(201).json({ message: `Welcome ${username}`})
    }
}