import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

import HeaderMenu from '../components/header_menu';
import UseAuth from '../utils/use_auth';
import './dashboard.css';

const {
  Header, Sider, Content, Footer,
} = Layout;

export default function Dashboard() {
  const Auth = useContext(UseAuth);

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
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <HeaderMenu />
        </Header>
        <Content>
          <div className="site-layout-background dashboard-info">
            <h2>{`Hello, ${Auth.user.name}`}</h2>
            <p>The front-end of the task manager app is built by React.js, Ant design and React Router. Speaking about back-end, the app is built by Express.js, MongoDB</p>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Task Manager ©2020 Created by Jay Pan</Footer>
      </Layout>
    </Layout>
  );
}
