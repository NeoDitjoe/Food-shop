const nodemailer = require("nodemailer");

const password = process.env.PASSWORD
const user = process.env.USER

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: password,
  },
});

export default async function sendCodeToEmail(email, username, code) {
  await transporter.sendMail({
    from: "BOBO's Shop no-reply@gmail.com",
    to: email,
    subject: `${code} Do not share this with Anyone`,
    text: "hello",
    html: `Hi ${username}, 

      Your sign-Up verificatiode code is: <h3>${code}</h3> 

      `,
  });

}

// export async function sendCodeToEmail(email, code) {
//   const info = await transporter.sendMail({
//     from: '"Pizza4Real 🍕" no-reply@gmail.com',
//     to: email,
//     subject: "Reset your password",
//     text: "Pizza4Real",
//     html: `
//       Reset password code: <h3>${code}</h3>
//       Click <a href='https://pizza4real.vercel.app/auth/reset-password/create-new-password'>here</a> to reset your password
//       `,
//   });

// }