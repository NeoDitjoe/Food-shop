import emailVerification from "@/database/auth/email/verification";

export default async function handler(req, res){

  if(req.method === 'POST'){

    const { email, code } = req.body

    try {
      await emailVerification(email, code, res)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'Failed attempt!'})
    }
  }
}