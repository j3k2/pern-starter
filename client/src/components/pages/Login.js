import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/User';
import auth from '../../services/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const userContext = useUser();

  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function login() {
    if(!username.length || !password.length) {
      toast.error('Username and password are required');
      return;
    }
    try {
      await auth.login({ username, password });

      const user = await auth.getUser();

      if (user) {
        userContext.setUser(user);
        history.push('/dashboard');
      }
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.body);
    }
  }

  return (
    <main className="centered-column">
      <h1 className="page-title">Login</h1>
      <form
        className="centered-column"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}>
        <input
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
      </form>
      <Link to="/signup">Sign up for an account</Link>
    </main>
  )
}

export default Login;