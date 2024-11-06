import React, { useState } from 'react';

const AddUserInfo = (props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('Hoi dan it');
  const [age, setAge] = useState('');

  const handleOnChangeInput = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleOnSubmit = (event) => {
    // tránh reload trang
    event.preventDefault();
    // gọi hàm handleAddNewUser từ component cha
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + '-random',
      name: name,
      age: age,
    });
  };
  return (
    <div>
      My name is {name} and I'm {age} years old.
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <label>Enter your name:</label>
        <input
          value={name}
          type='text'
          onChange={(event) => {
            handleOnChangeInput(event);
          }}
        />
        <button>submit</button>

        <label>Enter your age:</label>
        <input
          value={age}
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
