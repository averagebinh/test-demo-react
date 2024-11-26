import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im';
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';
const Login = (props) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
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
    setIsLoading(true);
    //submit api

    let data = await postLogin(email, password);

    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate('/');
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  const handleKeyDown = (event) => {
    console.log('event key', event.key);
    if (event && event.key === 'Enter') {
      handleLogin();
    }
  };
  return (
    <div className='login-container'>
      <div className='header mx-auto'>
        <span> {t('login.intro')}</span>
        <button onClick={() => navigate('/register')}>
          {' '}
          {t('login.button')}
        </button>
        <Language />
      </div>
      <div className='title col-4 mx-auto'> {t('login.brand')}</div>
      <div className='welcome col-4  mx-auto'> {t('login.welcome')}</div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
          <label> {t('login.form.email')}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>{t('login.form.password')}</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <span className='forgot-password'>{t('login.form.forgot')}</span>
        <div>
          <button
            onClick={() => handleLogin()}
            className='btn-submit'
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner10 className='loader-icon' />}

            <span> {t('login.form.button')}</span>
          </button>
        </div>
        <div className='text-center'>
          <span className='back' onClick={() => navigate('/')}>
            &#60;&#60;{t('login.form.back')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
