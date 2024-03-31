import { useRouter } from 'next/router'
import classes from '../../../styles/auth-form.module.css'
import postMethod from '@/util/post-method'
import { v4 as uuidv4 } from 'uuid';

export default function SendCode() {

  const router = useRouter()

  async function sendCodeHandler(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const number = formData.get('number')
    const code = uuidv4()
    console.log(`+27${number.substring(1, 10)}`)

    try {
      await postMethod('/api/auth/send-sms-code', {number: `+27${number.substring(1, 10)}`, code: code.substring(2, 7)})
    } catch (error) {
      alert('error')
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
          <button> submit </button>
        </div>
      </form>
    </section>
  )
}