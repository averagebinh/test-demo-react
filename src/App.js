import './App.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import PerfectScrollBar from 'react-perfect-scrollbar';
const App = () => {
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'></div>
      </div>
      <div className='app-content'>
        <PerfectScrollBar>
          <Outlet />
        </PerfectScrollBar>
      </div>
    </div>
  );
};

export default App;
