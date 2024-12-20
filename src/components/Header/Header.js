import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { useTranslation } from 'react-i18next';
import { FaReact } from 'react-icons/fa';
import Language from './Language';
import './Header.scss';
import Profile from './Profile';
import { useState } from 'react';
const Header = () => {
  const { t } = useTranslation();
  const [showModalProfile, setShowModalProfile] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  // console.log(account);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleLogOut = async () => {
    let res = await logout('account.email', account.refresh_token);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      //
      navigate('/login');
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Navbar expand='lg' bg='light'>
        <Container>
          <NavLink to='/' className='navbar-brand'>
            <span>
              <FaReact className='brand-icon' />
            </span>
            <span>{t('header.brand')}</span>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavLink to='/' className='nav-link'>
                {t('header.home')}
              </NavLink>
              <NavLink to='/users' className='nav-link'>
                {t('header.user')}
              </NavLink>

              <NavLink to='/admins' className='nav-link'>
                {t('header.admin')}
              </NavLink>
            </Nav>

            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className='btn-login' onClick={() => handleLogin()}>
                    {t('header.buttons.login')}
                  </button>
                  <button
                    className='btn-signup'
                    onClick={() => handleRegister()}
                  >
                    {t('header.buttons.register')}
                  </button>
                </>
              ) : (
                <NavDropdown
                  title={t('header.setting')}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item onClick={() => setShowModalProfile(true)}>
                    {t('header.profile')}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {t('header.buttons.logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={showModalProfile} setShow={setShowModalProfile} />
    </>
  );
};

export default Header;
