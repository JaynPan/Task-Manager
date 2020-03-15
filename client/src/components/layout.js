import React from 'react';
import { Layout, Menu } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

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
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <VideoCameraOutlined />
            <span className="nav-text">Tasks</span>
          </Menu.Item>
          <Menu.Item key="2">
            <VideoCameraOutlined />
            <span className="nav-text">User Settings</span>
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
