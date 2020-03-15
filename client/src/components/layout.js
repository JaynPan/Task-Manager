import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, VideoCameraOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import HeaderMenu from './header_menu';
import './layout.css';

const {
  Header, Sider, Content, Footer,
} = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo">Task Manager</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="0">
            <HomeOutlined />
            <NavLink to="/">
              Dashboard
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="1">
            <VideoCameraOutlined />
            <span className="nav-text">Tasks</span>
          </Menu.Item> */}
          <Menu.Item key="2">
            <SettingOutlined />
            <NavLink to="/settings">
              Settings
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <HeaderMenu />
        </Header>
        <Content>
          <div className="site-layout-background dashboard-info">
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Task Manager ©2020 Created by Jay Pan</Footer>
      </Layout>
    </Layout>
  );
}
