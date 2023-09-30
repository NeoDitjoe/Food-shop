import { connectDatabase } from "@/database/Database";
import hashPassword from "@/database/auth";

export default async function handler( req, res){

    const { username, email, password } = req.body

    if(!email || !email.includes('@') || !password || !password.length < 8){
        res.status('408').json({ message: 'Invalid Input password should include atleast 8 characters'})
        return;
    }

    const client = await connectDatabase('authentication')

    const db = client.db()

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
        username: username,
        email: email,
        password: hashedPassword

    })

    res.status(201).json({ message: `Welcome ${username}`})
}