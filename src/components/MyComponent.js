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
  handleOnMouseOver(event) {
    // console.log(event.pageX);
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        <p>Address: {this.state.address}</p>
        <p>Age: {this.state.age}</p>
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click me!
        </button>
        <button onMouseOver={this.handleOnMouseOver}>Hover me!</button>
      </div>
    );
  }
}

export default MyComponent;
