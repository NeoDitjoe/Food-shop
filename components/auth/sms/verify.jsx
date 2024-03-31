import postMethod from '@/util/post-method'
import classes from '../../../styles/auth-form.module.css'
import StateContext from '@/usecontext/stateContext'
import { useRouter } from 'next/router'

export default function VerifyNumber() {

  const { notification } = StateContext()
  const router = useRouter()

  async function verifyAndCreateHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const number = formData.get('number')
    const code = formData.get('code')
    const username = formData.get('username')
    const password = formData.get('password')

    notification.setText(`Checking...`);
    notification.setSeverity('info');

    try {
      const response = await postMethod('/api/auth/sms/verify', { number: `+27${number.substring(1, 10)}`, code, username, password })
      if (response.message === 'success') {
        notification.setText(`SMS with "Login Email" is sent to your phone`);
        notification.setSeverity('success');
        router.push('/auth')
      }
    } catch (error) {
      notification.setText(error.message || 'Failed attempt!');
      notification.setSeverity('error');
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{'Verify & Create Account'}</h1>
      <p style={{ color: 'red' }}>An sms with your login email will be sent your phone number</p>
      <form onSubmit={verifyAndCreateHandler}>

        <div className={classes.control}>
          <br />
          <label>Number</label>
          <div>
            <input type='number' name='number' required />
          </div>

          <br />
          <label>Code</label>
          <div className={classes.number}>
            <input type='code' name='code' required />
          </div>

          <br />
          <label>Create Username</label>
          <div >
            <input type='username' name='username' required />
          </div>

          <br />
          <label>Create Password</label>
          <div>
            <input type='password' name='password' required />
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
