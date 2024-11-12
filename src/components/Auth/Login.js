import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    //validate
    //submit api

    let data = await postLogin(email, password);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate('/');
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className='login-container'>
      <div className='header mx-auto'>
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
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
        <span className='forgot-password'>Forgot password ?</span>
        <div>
          <button onClick={() => handleLogin()} className='btn-submit'>
            Login to HoiDanIT
          </button>
        </div>
        <div className='text-center'>
          <span className='back' onClick={() => navigate('/')}>
            &#60;&#60;Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
