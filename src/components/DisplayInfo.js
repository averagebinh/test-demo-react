import React from 'react';
import './DisplayInfo.scss';
import logo from './../logo.svg';
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
      <div className='display-info-container'>
        <img src={logo} />
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
          <>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                  <div>My name's {user.name}</div>
                  <div>My age's {user.age} years old</div>
                  <hr />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}
export default DisplayInfo;
