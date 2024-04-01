import { client } from "@/database/Database";
import hashPassword from "@/database/auth";
import getCurrentWeek from "@/util/getCurrentWeek";

export default async function emailSignUp(username, email, password, code, res) {

  //error handling
  if (!email || !password || !username) {
    res.status(500).json({ message: 'Invalid Input: fill all fields' })
    return;
  }

  if (username.includes(' ')) {
    res.status(500).json({ message: 'Username should not inlude spaces' })
    return
  }

  if (!email.includes('@')) {
    res.status(500).json({ message: 'Email should include @' })
    return
  }

  if (password.length < 8) {
    res.status(500).json({ message: 'Password should include atleast 8 characters' })
    return
  }

  const db = client.db('authentication')

  /** 
 * checks if the email and Or username is already used.
 * If it is already in use, the sign up will fail
 * */
  const existingUserEmail = await db.collection('users').findOne({ email: email })
  const existingUsername = await db.collection('users').findOne({ username: username })
  const unVerifiedExistingEmail = await db.collection('verifyEmail').findOne({ email })

  //Notify customer that details are already in use
  if (existingUserEmail) {
    res.status(500).json({ message: 'Email is already used' })
    return;
  }

  //Notify customer that details are already in use
  if (existingUsername) {
    res.status(500).json({ message: 'username is already in use' })
    return;
  }

  /**
  * This is a password that has been encrypted,
  * before sent to database
  */
  const hashedPassword = await hashPassword(password)

  if (unVerifiedExistingEmail) {
    await db.collection('verifyEmail').updateOne(
      { email: email },
      {
        $set: {
          username: username,
          email: email,
          password: hashedPassword,
          createdAtWeek: getCurrentWeek(),
          code
        }
      }
    )

    return
  }

  /**
   * when all checks are successful customer details are then sent to database
   */
  await db.collection('verifyEmail').insertOne({
    username: username,
    email: email,
    password: hashedPassword,
    createdAtWeek: getCurrentWeek(),
    code
  })

}
