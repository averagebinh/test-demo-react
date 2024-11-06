import React, { useState } from 'react';

const AddUserInfo = (props) => {
  const [state, setState] = useState({ state });
  state = {
    name: 'Binh',
    address: 'Hoi dan it',
    age: 26,
  };

  const handleOnChangeInput = (event) => {
    setState({ name: event.target.value });
  };
  const handleOnChangeAge = (event) => {
    setState({ age: event.target.value });
  };
  const handleOnSubmit = (event) => {
    // tránh reload trang
    event.preventDefault();
    // gọi hàm handleAddNewUser từ component cha
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + '-random',
      name: state.name,
      age: state.age,
    });

    console.log(this.state);
  };
  return (
    <div>
      My name is {state.name} and I'm {state.age} years old.
      <form
        onSubmit={(event) => {
          this.handleOnSubmit(event);
        }}
      >
        <label>Enter your name:</label>
        <input
          value={this.state.name}
          type='text'
          onChange={(event) => {
            handleOnChangeInput(event);
          }}
        />
        <button>submit</button>

        <label>Enter your age:</label>
        <input
          value={this.state.age}
          type='text'
          onChange={(event) => {
            handleOnChangeAge(event);
          }}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default AddUserInfo;
