import React, { useState } from 'react';
import AddUserInfo from './AddUserInfo';
import DisplayInfo from './DisplayInfo';

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: 'Binh', age: '16' },
    { id: 2, name: 'Alex', age: '69' },
    { id: 3, name: 'Ranger', age: '12' },
  ]);

  // define function as props
  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };
  const handleDeleteUser = (id) => {
    const newListUsers = listUsers.filter((user) => user.id !== id);
    setListUsers(newListUsers);
  };
  return (
    <>
      <AddUserInfo handleAddNewUser={handleAddNewUser} />
      <br /> <br />
      <DisplayInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </>
  );
};

export default MyComponent;
