import React from 'react';
import UserInfo from './UserInfo';
import DisplayInfo from './DisplayInfo';

class MyComponent extends React.Component {
  render() {
    const myInfo = ['ab', 'c', 'c'];
    return (
      <div>
        <UserInfo />
        <br /> <br />
        <DisplayInfo name='Binh' age='30' />
        <DisplayInfo name='Alex' age={251} myInfo={myInfo} />
      </div>
    );
  }
}

export default MyComponent;
