import React, { useState } from 'react';
import { sendMagicLinkEmail } from './emailService'; // Your email service function

function LoginPage() {
  const [email, setEmail] = useState('');

  const handleMagicLinkRequest = () => {
    // Send a magic link to the provided email address
    sendMagicLinkEmail(email);
    // You can display a success message or redirect the user
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