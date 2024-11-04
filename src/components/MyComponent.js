import React from 'react';

class MyComponent extends React.Component {
  state = {
    name: 'Binh',
    address: 'Hoi dan it',
    age: 26,
  };
  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        <p>Address: {this.state.address}</p>
        <p>Age: {this.state.age}</p>
      </div>
    );
  }
}

export default MyComponent;
