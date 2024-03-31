import { client } from "@/database/Database";
import hashPassword from "@/database/auth";
import getCurrentWeek from "@/util/getCurrentWeek";
const accountSid = 'ACe80c5bcda1f361dfef98c8c36d92cc66';
const authToken = '6b0655e3a280f7363456bfe6c25e201c';
const sms = require('twilio')(accountSid, authToken);

export default async function verifyPhone(number, code, username, password, res) {

  const db = client.db('authentication')

  const phone = await db.collection('verifyNumber').findOne({ number })

  if (!phone) {
    res.status(500).json({ message: 'Incorrect phone number' })
    return
  }

  if (phone.code !== code) { 
    res.status(500).json({ message: 'Incorrect code' })
    return
  }

  if (password.split('').length < 8) {
    res.status(500).json({ message: 'Password should include atleast 8 characters' })
    return
  }

  const email = username + number.substring(8, 12) + '@gmail.com'
  const hashedPassword = await hashPassword(password)

  await db.collection('users').insertOne({
    username,
    number,
    email,
    password: hashedPassword,
    createdAtWeek: getCurrentWeek()
  })

  sms.messages
    .create({
      body: `From BOBO. use this email when login in ${email}`,
      from: '+12567332185',
      to: number
    })
}
