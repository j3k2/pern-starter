import React from 'react';
import { useUserContext } from '../../contexts/User';

const Dashboard = () => {
  const userContext = useUserContext();

  return (
    <main className="centered-column">
      Welcome, {userContext.user.username}!
    </main>
  )
}

export default Dashboard;