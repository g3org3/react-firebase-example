import React from 'react';
import { Redirect } from '@reach/router';

import Authenticate from './Authenticate';

const MyRedirect = () => <Redirect to="/login" noThrow />;
const Authenticating = () => (
  <div
    style={{
      background: 'orange',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h1>Authenticating ... just a moment</h1>
  </div>
);

export default Component => props => (
  <Authenticate>
    {({ user, loading, failed }) => {
      if (loading) return <Authenticating />;
      if (failed) return <MyRedirect />;
      return <Component {...props} user={user} />;
    }}
  </Authenticate>
);
