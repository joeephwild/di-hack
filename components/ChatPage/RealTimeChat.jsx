import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { ref, onChildAdded, off, push } from "firebase/database";
import { auth, db } from "../../firebase";



function RealTimeChat() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const user = auth.currentUser;

  // useEffect(() => {
  //   const chatRef = ref(db, 'chat');

  //   onChildAdded(chatRef, (snapshot) => {
  //     const newMessage = snapshot.val();
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   });

  //   return () => {
  //     off(chatRef);
  //   };
  // }, [db]);

  // const handleSendMessage = () => {
  //   if (messageInput.trim() === '') return;

  //   const chatRef = ref(db, 'chat');
  //   const newMessage= {
  //     text: messageInput,
  //     sender: user?.displayName || 'anonymous',
  //     timestamp: Date.now(),
  //   };

  //   push(chatRef, newMessage);
  //   setMessageInput('');
  // };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {message.sender}: {message.text}
        </div>
      ))}
      <input
        type="text"
        placeholder="Type your message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default RealTimeChat;
