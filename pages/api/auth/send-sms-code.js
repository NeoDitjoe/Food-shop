import sendSMS from "@/database/auth/sms/send-code"

export default async function handler(req, res) {

  if(req.method === 'POST'){

    const { number, code } = req.body

    try {
      await sendSMS(number, code)

      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to send code!'})
    }
  }
}

