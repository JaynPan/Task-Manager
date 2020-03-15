import React, { useState, useContext } from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import './header_menu.css';
import UseAuth from '../utils/use_auth';

export default function HeaderMenu() {
  const [current, setCurrent] = useState('');
  const Auth = useContext(UseAuth);

  const handleClick = async (e) => {
    setCurrent(e.key);

    if (e.key === 'logout') {
      const res = await fetch('/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });

      if (res.status === 200) {
        Cookies.remove('access_token');
        Auth.setAuth(false);
      }
    }
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="header-menu">
      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
}
