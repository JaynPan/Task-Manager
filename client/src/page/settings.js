import React from 'react';
import { Tabs } from 'antd';

import DashboardLayout from '../components/layout';
import UpadteUser from '../components/update_user';

const { TabPane } = Tabs;

export default function Settings() {
  function callback(key) {
    console.log(key);
  }

  return (
    <DashboardLayout>
      <h3>User Settings</h3>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Update User Profile" key="1">
          <UpadteUser />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </DashboardLayout>
  );
}
