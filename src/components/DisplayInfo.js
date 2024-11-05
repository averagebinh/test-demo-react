import React from 'react';
import './DisplayInfo.scss';
class DisplayInfo extends React.Component {
  state = { isShowListUser: true };
  handleShowHide() {
    this.setState({ isShowListUser: !this.state.isShowListUser });
  }
  render() {
    // destructuring array/object
    const { listUsers } = this.props;
    console.log(listUsers);
    return (
      <div>
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowListUser ? 'Hide' : 'Show'}
          </span>
        </div>

        {this.state.isShowListUser && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                  <div>My name's {user.name}</div>
                  <div>My age's {user.age} years old</div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfo;
