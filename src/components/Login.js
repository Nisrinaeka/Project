import { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    if(username == 'admin' && password == 'admin'){
      // lakukan validasi login disini, dan jika berhasil, simpan informasi login ke localStorage
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', username);
      navigate('/');
    window.location.reload();
    }else{
      setIsLogin(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form className="create-form" onSubmit={handleLogin}>
        <Form.Field>
        {!isLogin && password && (
          <label className="error-label">
            Wrong password. Please try again.
          </label>
        )}
          <label>Username</label>
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Login;
