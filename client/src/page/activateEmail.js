import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import FixedForm from '../styled-components/fixed_form';
import UseAuth from '../utils/use_auth';

export default function ActivateEmail() {
  const { auth } = useContext(UseAuth);

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <FixedForm style={{ textAlign: 'center' }}>
      <h3>Please Check Your Email to Activate Account! </h3>
    </FixedForm>
  );
}
