import { useRouter } from 'next/router'
import classes from '../../../styles/auth-form.module.css'
import postMethod from '@/util/post-method'
import { v4 as uuidv4 } from 'uuid';
import StateContext from '@/usecontext/stateContext';

export default function SendCode() {

  const router = useRouter()
  const { notification } = StateContext()

  async function sendCodeHandler(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const number = formData.get('number')
    const code = uuidv4()

    notification.setText('sending code...');
    notification.setSeverity('info');

    try {
      const response = await postMethod('/api/auth/sms/send-code', {number: `+27${number.substring(1, 10)}`, code: code.substring(2, 7)})

      if(response.message === 'success'){
        notification.setText(`code sent to ${`+27 ${number.substring(1, 10)}`}`);
        notification.setSeverity('success');
        router.push('/auth/sms/verify')
      }
      
    } catch (error) {
      notification.setText(error.message);
      notification.setSeverity('error');
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{'Send SMS'}</h1>
      <form onSubmit={sendCodeHandler}>

        <div className={classes.control}>
          <br />
          <label>Number</label>
          <div className={classes.number}>
            <input type='number' id='email' name='number' required />
          </div>
        </div>

        <br />
        <p
          className={classes.number}
          onClick={() => router.push('/auth')}
        >Sign up with email</p>

        <div className={classes.actions}>
          <button> Send Code </button>
        </div>
      </form>
    </section>
  )
}