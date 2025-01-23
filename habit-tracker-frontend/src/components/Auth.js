import React, { useState, useEffect } from 'react';

const Auth = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      onAuthSuccess();
    }
  }, [onAuthSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const endpoint = isRegistering ? '/register' : '/login';

    try {
      const response = await fetch(`http://localhost:3000/users${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert(isRegistering ? 'Registration successful!' : 'Login successful!');
        onAuthSuccess();
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setPassword('');
    alert('Logged out successfully');
    window.location.reload();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
          required
        />
        <button type="submit" style={{ padding: '8px' }} disabled={loading}>
          {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p
        style={{ cursor: 'pointer', color: 'blue' }}
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
      </p>

      {localStorage.getItem('token') && (
        <button onClick={handleLogout} style={{ marginTop: '10px', padding: '8px' }}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Auth;
