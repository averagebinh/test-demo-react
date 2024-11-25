import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfo from './UserInfo';
import Password from './Password';
import History from './History';
import { useTranslation } from 'react-i18next';

const Profile = (props) => {
  const { show, setShow } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setRole('USER');
    setImage('');
    setPreviewImage('');
  };
  const handleShow = () => {
    setShow(true);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static'
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('profile.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey='profile'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab eventKey='home' title='Main Info'>
              <UserInfo />
            </Tab>
            <Tab eventKey='password' title='Password'>
              <Password />
            </Tab>
            <Tab eventKey='history' title='History'>
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            {t('admin.manageUser.form.button-close')}
          </Button>
          <Button variant='primary'>
            {t('admin.manageUser.form.button-save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
