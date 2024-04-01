import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from 'styles/auth-form.module.css';
import StateContext from '@/usecontext/stateContext';
import { notificationTimer } from '../Notification/Notification';
import postMethod from '@/util/post-method';
import { v4 as uuidv4 } from 'uuid';

function AuthForm() {

  const { notification, isLogin, setIsLogin } = StateContext()

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredUsername;
    if (!isLogin) {
      enteredUsername = usernameInputRef.current.value;
    }

    /**
     * {@link isLogin} check if user is login or signing up 
     * 
     * {@link notification.setText} used to track the prosess of login or signing up
     * it displays a text showing user what exactly is happenning once the login or signup is clicked 
     */
    if (isLogin) {
      notification.setText('loading...')
      notification.setSeverity('info')
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail.toLowerCase(),
        password: enteredPassword,
      });

      if (result) {
        sessionStorage.setItem('Token', enteredEmail.toLowerCase())

      }
      if (!result.error) {
        notification.setText('logged in')
        notification.setSeverity('success')
        notificationTimer(notification)
        router.push('/profile')
      }

      if (result.error) {
        notification.setText(result.error)
        notification.setSeverity('error')
        notificationTimer(notification)
      }
    } else {

      const code = uuidv4()

      try {
        notification.setText('Loading...')
        notification.setSeverity('info')

        const result = await postMethod( '/api/auth/email/signUp', 
          { username: enteredUsername.toLowerCase(), email: enteredEmail.toLowerCase(), 
            password: enteredPassword, code:  code.substring(2, 7) 
          });
        if (result) {

          notification.setText(`Open Emails for verification code`)
          notification.setSeverity('success')
          notificationTimer(notification)
        }
      } catch (error) {

        notification.setText(error.message);
        notification.setSeverity('error');
        notificationTimer(notification)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>

        {!isLogin && <div className={classes.control}>
          <br />
          <label htmlFor='name'>Username</label>
          <input type='name' id='name' required ref={usernameInputRef} />
        </div>}

        <div className={classes.control}>
          <br />
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <br />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        {!isLogin &&<p
            className={classes.number}
            onClick={() => router.push('/auth/sms')}
          >Sign up with phone number</p>}

          <br />
          
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

