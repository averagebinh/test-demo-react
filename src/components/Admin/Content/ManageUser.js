import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
const ManageUser = () => {
  return (
    <div className='manage-user-container'>
      <div className='title'>Manage Users</div>

      <div className='users-content'>
        <div>
          <button>Add new users</button>
        </div>
        <div>table users</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
