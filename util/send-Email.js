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