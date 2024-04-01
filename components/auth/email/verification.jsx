import postMethod from '@/util/post-method'
import classes from '../../../styles/auth-form.module.css'
import StateContext from '@/usecontext/stateContext'
import { useRouter } from 'next/router'

export default function EmailVerification() {

  const router = useRouter()

  const { notification, setIsLogin } = StateContext()

  async function verificationHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const email = formData.get('email')
    const code = formData.get('code')

    notification.setText('Creating Account...')
    notification.setSeverity('info')

    try {
      const response = await postMethod('/api/auth/email/verification', { email, code })

      if (response.message) {
        notification.setText('Thank you for registering at BOBO')
        notification.setSeverity('success')
        setIsLogin(true)
        router.push('/auth')
      }

    } catch (error) {
      notification.setText(error.message)
      notification.setSeverity('error')
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{'Verify & Create Account'}</h1>
      <form onSubmit={verificationHandler}>

        <div className={classes.control}>

          <br />
          <label>Email</label>
          <div >
            <input type='email' name='email' required />
          </div>

          <br />
          <label>Code</label>
          <div>
            <input type='code' name='code' required />
          </div>
        </div>

        <br />

        <div className={classes.actions}>
          <button>Create account</button>
        </div>
      </form>
    </section>
  )
}
