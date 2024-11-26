import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';

import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiServices';
import { useTranslation } from 'react-i18next';

const ModalCreateUser = (props) => {
  const { t } = useTranslation();

  const { show, setShow } = props;

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

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      console.log('Umage');
    } else {
      setPreviewImage('');
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitCreateUser = async () => {
    try {
      // validate;
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        toast.error('Invalid email');
        return;
      }
      if (!password) {
        toast.error('Invalid password');
        return;
      }

      let data = await postCreateNewUser(
        email,
        password,
        username,
        role,
        image
      );
      //EM err message
      //EC err code 0 success 1 fail
      if (data && data.EC === 0) {
        toast.success(data.EM);
        handleClose();
        props.setCurrentPage(1);
        // await props.fetchListUsers();
        await props.fetchListUsersWithPaginate(1);
      }

      if (data && data.EC !== 0) {
        toast.error(data.EM);
      }
      // Optionally close the modal and reset form after successful submission
      setShow(false);
      setEmail('');
      setPassword('');
      setUsername('');
      setRole('USER');
      setImage('');
      setPreviewImage('');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('There was an error creating the user. Please try again.');
    }
  };
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
          <Modal.Title>{t('admin.manageUser.title-create')}</Modal.Title>
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
                type='file'
                className='form-control'
                id='labelUpload'
                onChange={(event) => handleUploadImage(event)}
                hidden
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span className=''> {t('admin.manageUser.form.preview')}</span>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            {t('admin.manageUser.form.button-close')}
          </Button>
          <Button variant='primary' onClick={() => handleSubmitCreateUser()}>
            {t('admin.manageUser.form.button-save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
