import { client } from "@/database/Database";

export default async function emailVerification(email, code, res) {

  const db = client.db('authentication')

  const isEmail = await db.collection('verifyEmail').findOne({ email })
  const isUser = await db.collection('users').findOne({ email })

  if (isUser) {
    res.status(500).json({ message: 'Email exists!' })
    return
  }

  if (!isEmail) {
    res.status(500).json({ message: 'Email not found!' })
    return
  }

  if (isEmail.code !== code) {
    res.status(500).json({ message: 'Incorrect code!' })
    return
  }

  await db.collection('users').insertOne(
    isEmail
  )
}
