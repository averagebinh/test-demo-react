import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { getAllUsers } from '../../../services/apiServices';

import { useState, useEffect } from 'react';
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';
const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [listUsers, setListUsers] = useState([]);

  //   componentDidMount;
  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();

    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdateUser(user);
    console.log('Update user', user);
  };
  const resetDataUpdateUser = () => {
    setDataUpdateUser({});
  };

  return (
    <div className='manage-user-container'>
      <div className='title'>Manage Users</div>

      <div className='users-content'>
        <div className='btn-add-new'>
          <button
            className='btn btn-primary'
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className='table-users-container'>
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          dateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdateUser={dataUpdateUser}
          fetchListUsers={fetchListUsers}
          resetDataUpdateUser={resetDataUpdateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
