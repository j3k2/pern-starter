import React from 'react';
import { useUser } from '../../contexts/User';

const Dashboard = () => {
  const userContext = useUser();

  return (
    <main className="centered-column">
      Welcome, {userContext.user.username}!
    </main>
  )
}

export default Dashboard;