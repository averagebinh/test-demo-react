import React, { useState } from 'react';
import AddUserInfo from './AddUserInfo';
import DisplayInfo from './DisplayInfo';

const MyComponent = () => {
  const [listUsers, setListUsers] = useState(listUsers);

  listUsers = [
    { id: 1, name: 'Binh', age: '16' },
    { id: 2, name: 'Alex', age: '69' },
    { id: 3, name: 'Ranger', age: '12' },
  ];
  // define function as props
  const handleAddNewUser = (userObj) => {
    console.log('userObj', userObj);
    setListUsers({ listUsers: [userObj, ...listUsers] });
  };
  const handleDeleteUser = (id) => {
    const newListUsers = listUsers.filter((user) => user.id !== id);
    setListUsers({ listUsers: newListUsers });
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
