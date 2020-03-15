import React from 'react';
import { Tabs } from 'antd';

import DashboardLayout from '../components/layout';
import UpadteUser from '../components/update_user';
import DeleteUser from '../components/delete_user';

const { TabPane } = Tabs;

export default function Settings() {
  return (
    <DashboardLayout>
      <h3>User Settings</h3>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Update User Profile" key="1">
          <UpadteUser />
        </TabPane>
        <TabPane tab="Delete Account" key="2">
          <DeleteUser />
        </TabPane>
      </Tabs>
    </DashboardLayout>
  );
}
