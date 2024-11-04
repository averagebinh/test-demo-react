import React from 'react';

class MyComponent extends React.Component {
  state = {
    name: 'Binh',
    address: 'Hoi dan it',
    age: 26,
  };
  handleClick(event) {
    console.log('>>>>> Click me my button!');
    console.log(event.target);
  }
  handleOnMouseOver(event) {
    console.log(event.pageX);
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        <p>Address: {this.state.address}</p>
        <p>Age: {this.state.age}</p>
        <button onClick={this.handleClick}>Click me!</button>
        <button onMouseOver={this.handleOnMouseOver}>Hover me!</button>
      </div>
    );
  }
}

export default MyComponent;
