import React from 'react';

class UserInfo extends React.Component {
  state = {
    name: 'Binh',
    address: 'Hoi dan it',
    age: 26,
  };

  handleOnChangeInput(event) {
    this.setState({ name: event.target.value });
  }
  handleOnChangeAge(event) {
    this.setState({ age: event.target.value });
  }
  handleOnSubmit(event) {
    // tránh reload trang
    event.preventDefault();

    console.log(this.state);
  }
  render() {
    return (
      <div>
        {' '}
        My name is {this.state.name} and I'm {this.state.age} years old.
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Enter your name:</label>
          <input
            value={this.state.name}
            type='text'
            onChange={(event) => {
              this.handleOnChangeInput(event);
            }}
          />
          <button>submit</button>
          <br />
          <label>Enter your age:</label>
          <input
            value={this.state.age}
            type='text'
            onChange={(event) => {
              this.handleOnChangeAge(event);
            }}
          />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
