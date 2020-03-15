import React, { useContext } from 'react';

import DashboardLayout from '../components/layout';
import UseAuth from '../utils/use_auth';

export default function Dashboard() {
  const Auth = useContext(UseAuth);

  return (
    <DashboardLayout>
      <h2>{`Hello, ${Auth.user.name}`}</h2>
      <p>The front-end of the task manager app is built by React.js, Ant design and React Router. Speaking about back-end, the app is built by Express.js, MongoDB</p>
    </DashboardLayout>
  );
}
