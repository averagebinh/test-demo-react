import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEyeSlash } from 'react-icons/fa';
import { VscEye, VscEyeClosed } from 'react-icons/vsc'; // VSCode Icons
import Language from '../Header/Language';
const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }
    if (!password) {
      toast.error('Invalid password');
      return;
    }
    //submit api
    console.log('register', email, password, username);
    let data = await postRegister(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate('/login');
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className='register-container'>
      <div className='header mx-auto'>
        <span>Already have an account?</span>
        <button onClick={() => navigate('../Login')}>Log in</button>
        <Language />
      </div>
      <div className='title col-4 mx-auto'>Sign up now</div>
      <div className='welcome col-4  mx-auto'>Start your journey?</div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
          <label>Email (*)</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='form-control'
          />
        </div>
        <div className='form-group pass-group'>
          <label>Password (*)</label>

          <input
            type={isShowPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
          />
          {isShowPassword ? (
            <span
              className='icons-eye'
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>

        <div className='form-group'>
          <label>Username </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='username'
            className='form-control'
          />
        </div>
        <span className='forgot-password'>Forgot password ?</span>
        <div>
          <button onClick={() => handleRegister()} className='btn-submit'>
            Create my free account
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

export default Register;
