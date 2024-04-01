import classes from '../../../styles/auth-form.module.css'

export default function EmailVerification() {
  return (
    <section className={classes.auth}>
    <h1>{'Verify & Create Account'}</h1>
    <form onSubmit={null}>

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
