import React from 'react';
class DisplayInfo extends React.Component {
  render() {
    // destructuring array/object
    const { listUsers } = this.props;
    console.log(listUsers);
    return (
      <div>
        {listUsers.map((user) => {
          return (
            <div>
              <div>My name's {user.name}</div>
              <div>My age's {user.age} years old</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
export default DisplayInfo;
