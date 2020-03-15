import React, { useContext } from 'react';

import UseAuth from '../utils/use_auth';
import Logout from '../components/logout';

export default function Dashboard() {
  const Auth = useContext(UseAuth);

  return (
    <div>
      <h3>Home</h3>
      <p>{`Hello, ${Auth.user.name}`}</p>
      <Logout />
    </div>
  );
}
