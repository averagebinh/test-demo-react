import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';

import { toast } from 'react-toastify';
// import { putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { postUpdateProfile } from '../../services/apiServices';

const UserInfo = (props) => {
  const account = useSelector((state) => state.user.account);

  console.log(account);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage(account.image);
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);
  const handleUploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitUpdateUser = async () => {
    try {
      // validate;

      if (!username) {
        toast.error('Invalid user');
        return;
      }

      let data = await postUpdateProfile(username, image);
      //EM err message
      //EC err code 0 success 1 fail
      if (data && data.EC === 0) {
        toast.success(data.EM);
        // props.setCurrentPage(1);
        // await props.fetchListUsers();
        // await props.fetchListUsersWithPaginate(props.currentPage);
      }

      if (data && data.EC !== 0) {
        toast.error(data.EM);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('There was an error creating the user. Please try again.');
    }
  };

  return (
    <div>
      <form className='row g-3'>
        <div className='col-md-6'>
          <label className='form-label'>
            {' '}
            {t('admin.manageUser.form.username')}
          </label>
          <input
            type='text'
            className='form-control'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
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

        <div className='col-md-4'>
          <label className='form-label'>
            {' '}
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
            <span className=''>{t('admin.manageUser.form.preview')}</span>
          )}
        </div>
      </form>
      <button
        className='btn btn-warning mt-3'
        onClick={() => handleSubmitUpdateUser()}
      >
        Update
      </button>
    </div>
  );
};

export default UserInfo;
