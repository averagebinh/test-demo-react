import React from 'react';
import AddUserInfo from './AddUserInfo';
import DisplayInfo from './DisplayInfo';

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: 'Binh', age: '16' },
      { id: 2, name: 'Alex', age: '69' },
      { id: 3, name: 'Ranger', age: '12' },
    ],
  };
  // define function as props
  handleAddNewUser = (userObj) => {
    console.log('userObj', userObj);
    this.setState({ listUsers: [userObj, ...this.state.listUsers] });
  };
  handleDeleteUser = (id) => {
    const newListUsers = this.state.listUsers.filter((user) => user.id !== id);
    this.setState({ listUsers: newListUsers });
  };
  render() {
    return (
      <>
        <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
        <br /> <br />
        <DisplayInfo
          listUsers={this.state.listUsers}
          handleDeleteUser={this.handleDeleteUser}
        />
      </>
    );
  }
}

export default MyComponent;
