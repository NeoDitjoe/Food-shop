import { client } from "@/database/Database";
const accountSid = 'ACe80c5bcda1f361dfef98c8c36d92cc66';
const authToken = '6b0655e3a280f7363456bfe6c25e201c';
const sms = require('twilio')(accountSid, authToken);

export default async function sendSMS(number, code, res) {

  const db = client.db('authentication')

  const isNumber = await db.collection('users').findOne({ number })
  const newCode = await db.collection('verifyNumber').findOne({ number })

  if (isNumber) {
    res.status(500).json({ message: 'Phone is already registered' })
    return
  }

  if (newCode) {
    await db.collection('verifyNumber').updateOne(
      {number},
      {$set: { code }}
    )

    sms.messages
    .create({
      body: `BOBO verification code is: ${code} `,
      from: '+12567332185',
      to: number
    })

    return
  }

  await db.collection('verifyNumber').insertOne({
    number,
    code
  })

  sms.messages
    .create({
      body: `BOBO verification code is: ${code} `,
      from: '+12567332185',
      to: number
    })
}