import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/User';
import auth from '../../services/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const userContext = useUser();

  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function signup() {
    try {
      await auth.signup({ username, password });

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
    <main className="page">
      <h1 className="page-title">Sign up</h1>
      <form
        className="authentication-form"
        onSubmit={(e) => {
          e.preventDefault();
          signup();
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
        <input type="submit" value="Sign up" />
      </form>
      <Link to="/login">Already have an account? Log In</Link>
    </main>
  )
}

export default Signup;