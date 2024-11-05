import React from 'react';
import './DisplayInfo.scss';
import logo from './../logo.svg';
class DisplayInfo extends React.Component {
  constructor(props) {
    console.log('>>>>>constructor:1');
    super(props);
    this.state = { isShowListUser: true };
  }
  componentDidMount() {
    console.log('>>>>>componentDidMount');
    setTimeout(() => {
      document.title = 'BOP';
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('>>>>>componentDidUpdate', this.props, prevProps);
    if (this.props.listUsers !== prevProps.listUsers) {
      if (this.props.listUsers.length === 5) {
        console.log('you got 5 users');
      }
    }
  }
  handleShowHide() {
    this.setState({ isShowListUser: !this.state.isShowListUser });
  }

  render() {
    console.log('>>>>>render');
    // destructuring array/object
    const { listUsers } = this.props;
    {
      console.log(listUsers);
    }
    return (
      <div className='display-info-container'>
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
                  <div>
                    <div>My name's {user.name}</div>
                    <div>My age's {user.age} years old</div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
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
