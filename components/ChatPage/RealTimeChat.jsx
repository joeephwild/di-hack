import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import 'firebase/database'; 
import 'firebase/firestore';

function RealTimeChat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const user = firebase.auth().currentUser;
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const chatRef = firebase.database().ref('chat');


    const firebaseConfig = {
      apiKey: "AIzaSyDEAroIm39cl1EYGRH9Pj8rDMYG5aQqgk8",
      authDomain: "lancet-8b75a.firebaseapp.com",
      projectId: "lancet-8b75a",
      storageBucket: "lancet-8b75a.appspot.com",
      messagingSenderId: "576688913137",
      appId: "1:576688913137:web:ae10e4051abc1ffa918750",
      measurementId: "G-B722CL9HWJ"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    

    // Listen for new messages
    chatRef.on('child_added', (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // Unsubscribe from Firebase Realtime Database
      chatRef.off();
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    // Send the message to Firebase Realtime Database
    const chatRef = firebase.database().ref('chat');
    const newMessage = {
      text: messageInput,
      sender: user.displayName || 'Anonymous',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    chatRef.push(newMessage);
    setMessageInput('');
  };

  return (
    <div className="real-time-chat">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="message-sender">{message.sender}:</span> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default RealTimeChat;