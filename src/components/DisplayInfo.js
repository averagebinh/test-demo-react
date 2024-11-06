import React, { useEffect, useState } from 'react';
import './DisplayInfo.scss';
import logo from './../logo.svg';

const DisplayInfo = (props) => {
  const [isShowHideListUser, setIsShowHideListUser] = useState(true);

  const handleShowHideListUser = () => {
    setIsShowHideListUser(!isShowHideListUser);
  };
  console.log('>>>>>>Call me render');
  useEffect(() => {
    setTimeout(() => {
      document.title = 'Eric & HoidanIt';
    }, 3000);
    console.log('>>>>>>Call me useEffect');
  }, []);
  return (
    <div className='display-info-container'>
      <div>
        <span onClick={() => handleShowHideListUser()}>
          {isShowHideListUser === true ? 'Hide List Users' : 'Show List Users'}
        </span>
      </div>
      {isShowHideListUser && (
        <>
          {props.listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                <div>
                  <div>My name's {user.name}</div>
                  <div>My age's {user.age} years old</div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfo;
