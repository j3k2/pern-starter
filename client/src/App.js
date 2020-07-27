import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useUser } from './contexts/User';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';

import loadingSpinner from './assets/loading.gif';
import auth from './services/auth';

function AuthenticatedApp() {
  const userContext = useUser();

  return (
    <Router>
      <Header>
        <span>{`Logged in as: ${JSON.stringify(userContext.user.username)}`}
        </span>
        <button onClick={() => {
          auth.logout();
          userContext.setUser(null);
        }}>Logout</button>
      </Header>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  )
}

function UnauthenticatedApp() {
  return (
    <Router>
      {/* <Header>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign Up</Link>
      </Header> */}
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={Landing}/>
        <Route path="*" component={Landing}/> */}
        <Route path="*">
          <Redirect to="/login"/>
        </Route>
      </Switch>
    </Router>
  )
}

function App() {
  const userContext = useUser();
  const user = userContext.user;
  const userPending = userContext.userPending;

  return (<React.Fragment>
    {userPending && <img
      className="page-loading-spinner"
      width={24}
      alt="loading"
      src={loadingSpinner} />}
    {!userPending && user && <AuthenticatedApp />}
    {!userPending && !user && <UnauthenticatedApp />}
    <ToastContainer />
  </React.Fragment>);
}

export default App;
