import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const ModalViewUser = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataUpdateUser } = props;

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setRole('USER');
    setImage('');
    setPreviewImage('');
    props.resetDataUpdateUser();
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    console.log('run effect in Modal Update', dataUpdateUser);
    if (!_.isEmpty(dataUpdateUser)) {
      setEmail(dataUpdateUser.email);
      setUsername(dataUpdateUser.username);
      setRole(dataUpdateUser.role);
      dataUpdateUser.image &&
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateUser.image}`);
    }
  }, [dataUpdateUser]);
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
          <Modal.Title>{t('admin.manageUser.title-view')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>
                {t('admin.manageUser.form.email')}
              </label>
              <input
                type='email'
                className='form-control'
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>
                {t('admin.manageUser.form.password')}
              </label>
              <input
                type='password'
                className='form-control'
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>
                {t('admin.manageUser.form.username')}
              </label>
              <input
                type='text'
                className='form-control'
                value={username}
                disabled
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label'>
                {t('admin.manageUser.form.role')}
              </label>

              <select
                className='form-select'
                onChange={(event) => setRole(event.target.value)}
                value={role}
                disabled
              >
                <option value='USER'>
                  {t('admin.manageUser.form.options.user')}
                </option>
                <option value='ADMIN'>
                  {t('admin.manageUser.form.options.admin')}
                </option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus />
                {t('admin.manageUser.form.upload')}
              </label>
              <input
                disabled
                type='file'
                className='form-control'
                id='labelUpload'
                hidden
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span className=''>{t('admin.manageUser.form.preview')}</span>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            {t('admin.manageUser.form.button-close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalViewUser;
