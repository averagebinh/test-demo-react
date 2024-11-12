import { useState } from 'react';
import './Login.scss';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('login');
  };
  return (
    <div className='login-container'>
      <div className='header mx-auto'>Don't have an account yet? </div>
      <div className='title col-4 mx-auto'>HoiDanIt</div>
      <div className='welcome col-4  mx-auto'>Hello, whos this?</div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <span className='forgot-password'>Forgor password ?</span>
        <div>
          <button onClick={() => handleLogin()} className='btn-submit'>
            Login to HoiDanIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
