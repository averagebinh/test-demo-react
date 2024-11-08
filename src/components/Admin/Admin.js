import React, { useState } from 'react';
import SideBar from './SideBar';
import { FaHeart, FaBars } from 'react-icons/fa';
import './Admin.scss';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <SideBar collapsed={collapsed} />
      </div>

      <div className='admin-content'>
        <div className='admin-header'>
          <FaBars
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </div>
        <div className='admin-main'>
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Admin;
