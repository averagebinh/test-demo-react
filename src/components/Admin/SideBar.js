import 'react-pro-sidebar/dist/css/styles.css';
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from 'react-icons/fa';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import sidebarBg from '../../assets/bg2.jpg';

import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import './SideBar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint='md'
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <DiReact size={'3em'} color={'00bfff'} />

            <span onClick={() => navigate('/')}>
              {t('admin.sidebar.brand')}
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem
              icon={<FaTachometerAlt />}
              //   suffix={<span className='badge red'>New</span>}
            >
              {t('admin.sidebar.feature-1')}
              <Link to='/admins' />
            </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu icon={<FaGem />} title='Features'>
              <MenuItem>
                {t('admin.sidebar.feature-2')}
                <Link to='/admins/manage-users' />
              </MenuItem>
              <MenuItem>
                {t('admin.sidebar.feature-3')}
                <Link to='/admins/manage-quizzes' />
              </MenuItem>
              <MenuItem>
                {t('admin.sidebar.feature-4')}
                <Link to='/admins/manage-questions' />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className='sidebar-btn-wrapper'
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href='https://github.com/averagebinh/test-demo-react/'
              target='_blank'
              className='sidebar-btn'
              rel='noopener noreferrer'
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {t('admin.sidebar.viewSource')}
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
