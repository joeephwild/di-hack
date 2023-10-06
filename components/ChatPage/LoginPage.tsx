import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import MagicLinkPage from './MagicLink'; // Import the MagicLinkPage component

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('')
  const history = useNavigate();

  const handleMagicLinkRequest = () => {
    if (email.trim() === '') {
      setErrorMessage('Email is required')
      return;
    }

    // Redirect the user to the MagicLinkPage component with the email as a query parameter
    history(`/magic-link?email=${email}`);
  };

  return (
    <div className="login-container">
      <h2>Login with Magic Link</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleMagicLinkRequest}>Request Magic Link</button>
    </div>
  );
}

export default LoginPage;
