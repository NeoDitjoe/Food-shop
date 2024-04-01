import emailSignUp from "@/database/auth/email/sign-up"

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { username, email, password, code } = req.body

		try {
			await emailSignUp(username, email, password, code, res) 
			res.status(201).json({ message: `success` })

		} catch (error) {
			res.status(500).json({ message: error.message || 'Failed attempt!' })
		}
	}
}
