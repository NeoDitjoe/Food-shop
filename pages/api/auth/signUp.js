import { client } from "@/database/Database";
import hashPassword from "@/database/auth";

export default async function handler( req, res){
    if( req.method === 'POST'){
        const { username, email, password } = req.body

        //error handling
        if( !email || !password|| !username   ){
            res.status(400).json({ message: 'Invalid Input: fill all fields'})
            return;
        }

        if( username.includes(' ') ){
            res.status(400).json({ message: 'Username should not inlude spaces'})
            return
        }

        if( !email.includes('@')){
            res.status(400).json({ message: 'Email should include @'})
            return
        }

        if( !password.length >= 8 ){
            res.status(400).json({ message: 'Password should include atleast 8 characters'})
            return
        }

        //connect to database
        
        const db = client.db('authentication')

        /** 
         * checks if the email and Or username is already used.
         * If it is already in use, the sign up will fail
         * */ 
        const existingUserEmail = await db.collection('users').findOne({ email: email })
        const existingUsername = await db.collection('users').findOne({ username: username })

        //Notify customer that details are already in use
        if(existingUserEmail){
            res.status(400).json({ message : 'Email is already used'})
            return;
        }

        //Notify customer that details are already in use
        if(existingUsername){
            res.status(400).json({ message : 'username is already in use'})
            return;
        }

        /**
         * This is a password that has been encrypted,
         * before sent to database
         */
        const hashedPassword = await hashPassword(password)

        /**
         * when all checks are successful customer details are then sent to database
         */
        const result = await db.collection('users').insertOne({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.status(201).json({ message: `Welcome ${username}`})
    }
}
