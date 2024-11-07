import React, { useState } from 'react';
import SideBar from './SideBar';
import { FaHeart, FaBars } from 'react-icons/fa';
import './Admin.scss';
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <SideBar collapsed={collapsed} />
      </div>
      <div className='admin-contnet'>
        <FaBars
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        />
        Content goes here
      </div>
    </div>
  );
};

export default Admin;
