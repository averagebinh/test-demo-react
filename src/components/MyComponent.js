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
  handleAddNewUser(userObj) {
    alert('me');
    console.log('userObj', userObj);
    this.setState({ listUsers: [userObj, ...this.state.listUsers] });
  }
  render() {
    return (
      <div>
        {/* pass func as props */}
        <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
        <br /> <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
