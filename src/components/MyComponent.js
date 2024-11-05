import React from 'react';

class MyComponent extends React.Component {
  state = {
    name: 'Binh',
    address: 'Hoi dan it',
    age: 26,
  };
  handleClick = (event) => {
    console.log('>>>>> Click me my button!');
    this.setState({
      name: 'Binh Nguyen',
      age: Math.floor(Math.random() * 100) + 1,
    });
  };

  handleOnChangeInput(event) {
    this.setState({ name: event.target.value });
  }
  handleOnSubmit(event) {
    // tránh reload trang
    event.preventDefault();
    alert('me');
    console.log(this.state);
  }
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type='text'
            onChange={(event) => {
              this.handleOnChangeInput(event);
            }}
          />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
