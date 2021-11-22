import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import './LoginForm.css';
import { doLogin } from '../actions';
import { connect } from 'react-redux';

function LoginForm({dispatchEmail}) {
  const [loginControl, setLoginControl] = useState('');
  const [pwdControl, setPwdControl] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(null);
  const [passwordInvalid, setPasswordInvalid] = useState(null);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!isEmailValid(loginControl)) {
      setEmailInvalid('true');
      if (pwdControl.length < 6) {
        setPasswordInvalid('true')
      }
    } else if (pwdControl.length < 6) {
      setPasswordInvalid('true');
    } else {
      dispatchEmail(loginControl);
      navigate('/wallet');
    }
  }
  return (
    <div className="login-container">
        <AccountBalanceWalletIcon sx={ { fontSize: 80 } } />
        <h1>Welcome to your wallet!</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="email-input"
          value={ loginControl }
          onChange={ ({ target: { value } }) => {
            setEmailInvalid('');
            setLoginControl(value);
          } }
        />
        { emailInvalid === 'true' ? <small className="invalid">Please use a valid email format</small> : '' }
        <input
          type="password"
          placeholder="Password"
          className="password-input"
          value={ pwdControl }
          onChange={ ({ target: { value } }) => {
            setPasswordInvalid('')
            setPwdControl(value);
          } }
        />
        { passwordInvalid === 'true' ? <small className="invalid">Your password must be at least 6 characters long</small> : '' }
        <button
          tyṕe="button"
          className="sign-in-btn"
          onClick={ (e) => { handleClick(e) } }
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (value) => dispatch(doLogin(value)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
