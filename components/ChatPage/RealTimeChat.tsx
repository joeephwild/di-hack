import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { ref, onChildAdded, off, push } from "firebase/database";
import { auth, db } from "../../firebase";

const firebaseConfig = {
  apiKey: "AIzaSyACWp-N8oSQIEDEfr-WkGPxIwYwGZydij4",
  authDomain: "lacent-7a6b4.firebaseapp.com",
  databaseURL: "https://lacent-7a6b4-default-rtdb.firebaseio.com/",
  projectId: "lacent-7a6b4",
  storageBucket: "lacent-7a6b4.appspot.com",
  messagingSenderId: "388128287208",
  appId: "1:388128287208:web:22e1bf229fc29edb909c5d"
};

interface Message {
  text: string;
  sender: string;
  timestamp: number;
}

function RealTimeChat() {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const chatRef = ref(db, 'chat');

    onChildAdded(chatRef, (snapshot) => {
      const newMessage: Message = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      off(chatRef);
    };
  }, [db]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const chatRef = ref(db, 'chat');
    const newMessage: Message = {
      text: messageInput,
      sender: user?.displayName || 'anonymous',
      timestamp: Date.now(),
    };

    push(chatRef, newMessage);
    setMessageInput('');
  };

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
