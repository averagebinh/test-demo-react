import React from 'react';
import UserInfo from './UserInfo';
import DisplayInfo from './DisplayInfo';

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: 'Binh', age: '16' },
      { id: 2, name: 'Alex', age: '69' },
      { id: 3, name: 'Ranger', age: '12' },
    ],
  };
  render() {
    return (
      <div>
        <UserInfo />
        <br /> <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
