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
import { postChangePassword } from '../../services/apiServices';
// import { postUpdateProfile } from '../../services/apiServices';

const Password = (props) => {
  const account = useSelector((state) => state.user.account);

  console.log(account);
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmitUpdatePassword = async () => {
    try {
      // validate;

      if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
        toast.error('Invalid password');
        return;
      }

      let data = await postChangePassword(currentPassword, newPassword);
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
          <label className='form-label'>Current Password</label>
          <input
            type='password'
            className='form-control'
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>

        <div className='col-md-6'>
          <label className='form-label'>New Password</label>
          <input
            type='password'
            className='form-control'
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>

        <div className='col-md-6'>
          <label className='form-label'>Confirm Password </label>
          <input
            type='password'
            className='form-control'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      </form>
      <button
        className='btn btn-warning mt-3'
        onClick={() => handleSubmitUpdatePassword()}
      >
        Update
      </button>
    </div>
  );
};

export default Password;
