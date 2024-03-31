import verifyPhone from "@/database/auth/sms/verify"

export default async function handler(req, res){

  if(req.method === 'POST'){

    const { number, code, username, password } = req.body

    try {
      await verifyPhone(number, code, username, password, res)
      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(200).json({ message: error.message || 'Failed attempt!'})
    }
  }
}