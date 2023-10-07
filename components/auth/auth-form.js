import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from 'styles/auth-form.module.css';
import StateContext from '@/usecontext/stateContext';

async function createUser(username, email, password) {

  const response = await fetch('/api/auth/signUp', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {

  const { notification } = StateContext()

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
 
  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredUsername ;
    if(!isLogin){
      enteredUsername = usernameInputRef.current.value;
    }


    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail.toLowerCase(),
        password: enteredPassword,
      });

      if(result){
        sessionStorage.setItem('Token', enteredEmail.toLowerCase())
      }
      

      if (!result.error) {
        // set some auth state
        router.replace('/profile');
      }

    } else {
      try {
        notification.setText('Loading...')
        notification.setBackground('loadingNotification')
        const result = await createUser(enteredUsername.toLowerCase(), enteredEmail.toLowerCase(), enteredPassword);
        if(result){
          notification.setText(`Welcome ${enteredUsername}`)
          notification.setBackground('welcomeNotification')
        }
      } catch (error) {
        notification.setText(error.message);
        notification.setBackground('errorNotification');
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>

        {!isLogin && <div className={classes.control}>
          <br/>
          <label htmlFor='name'>Username</label>
          <input type='name' id='name' required ref={usernameInputRef} />
        </div>}

        <div className={classes.control}>
          <br/>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <br/>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
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

