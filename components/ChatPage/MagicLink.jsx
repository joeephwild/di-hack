import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { signInWithEmailLink } from 'firebase/auth';

function MagicLinkPage() {
  const router = useRouter();
  const { magicToken } = router.query;

  useEffect(() => {
    if (magicToken) {
      // Authenticate the user using Firebase Authentication
      signInWithEmailLink(auth, '',) // Assuming magicToken is a string
        .then((userCredential) => {
          const user = userCredential.user;
          // Redirect the user to the chat page or a desired location
          router.push('/chat');
        })
        .catch((error) => {
          console.error(error.message);
          // Handle authentication error, e.g., invalid token
          router.push('/login'); // Redirect back to the login page
        });
    } else {
      // No magic token found, redirect to the login page
      router.push('/login');
    }
  }, [magicToken, router]);

  return (
    <div>
      {/* You can display a loading indicator or a message here */}
    </div>
  );
}

export default MagicLinkPage;