import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Clear error messages before making the API request
    setPasswordError('');
    setErrorMsg('');

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/register`,
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    setIsLoading(false);

    if (response.ok) {
      setUsername('');
      setPassword('');
      alert('Registration Successful!');
      navigate('/login');
    } else {
      const data = await response.json();
      setErrorMsg(data.msg);
    }
  };

  return (
    <form className="register" onSubmit={registerUser}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && (
        <p
          style={{
            marginTop: '50x',
            marginBottom: '5px',
            color: 'red',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          {passwordError}
        </p>
      )}
      {errorMsg && !passwordError && (
        <p
          style={{
            marginTop: '50x',
            marginBottom: '5px',
            color: 'red',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          {errorMsg}
        </p>
      )}
      <button type="submit" disabled={isLoading}>
        Register
      </button>
    </form>
  );
};

export default Register;
