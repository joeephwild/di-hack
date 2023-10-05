import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFlow } from "../../context/FlowContext";
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

function RealTimeChat() {
  const [messageInput, setMessageInput] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const chatRef = ref(db, 'chat');

    // listen for new messages
    onChildAdded(chatRef, (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // unsubscribe from firebase realtime database
      off(chatRef);
    };
  }, [db]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    // send the message to firebase realtime database
    const chatRef = ref(db, 'chat');
    const newMessage = {
      text: messageInput,
      sender: user.displayName || 'anonymous',
      timestamp: Date.now(),
    };

    push(chatRef, newMessage);
    setMessageInput('');
  };

  return (
    <div>
      Chat App
    </div>
  );
}

export default RealTimeChat;
 