import React from 'react';
import { useUser } from '../../contexts/User';

const Dashboard = () => {
  const userContext = useUser();

  return (
    <React.Fragment>
      <main className="page">
        Welcome, {userContext.user.username}!
      </main>
    </React.Fragment>
  )
}

export default Dashboard;