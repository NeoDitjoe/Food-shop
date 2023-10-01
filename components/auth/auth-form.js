import { useRef, useState } from 'react';
import classes from 'styles/auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function createUser(username, email, password){
    const response = await fetch('/api/auth' , {
      method: 'POST',
      body: JSON.stringify({ username, email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if(!response.ok){
      throw new Error(data.message || 'Something went wrong')
    }

    return data
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submithandler(e){
    e.preventDefault()

    const usernameInput = usernameRef.current.value
    const emailInput = emailRef.current.value
    const passwordInput = passwordRef.current.value

    if(isLogin){
      console.log('what')
    }else {

      try{
        const result = await createUser(usernameInput, emailInput, passwordInput)
        console.log(result)
      }catch(error){
        console.log(error)
      }
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={submithandler}>
        <div className={classes.control}>
        <label htmlFor='name' id='name-label'>Username</label>
          <input type='name' id='name' required ref={usernameRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>

        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>

        </div>
      </form>

    </section>
  );
}

export default AuthForm;