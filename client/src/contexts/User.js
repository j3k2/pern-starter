import React from 'react';
import auth from '../services/auth';

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = React.useState();
  const [userPending, setUserPending] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      async function fetchUser() {
        try {
          const user = await auth.getUser();
          setUser(user);
          setUserPending(false);
        } catch {
          setUserPending(false);
        }
      };
      fetchUser();
    } else {
      setUserPending(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      userPending
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUser = () => React.useContext(UserContext);

export default UserContext;

export { UserProvider, useUser }