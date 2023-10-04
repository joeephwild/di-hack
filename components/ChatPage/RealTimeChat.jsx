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



function  RealTimeChat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showPersonalChat, setShowPersonalChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);



  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
    


  useEffect(() => {
    const unsubscribe = firestore.collection('userProfiles').onSnapshot(snapshot => {
      const profiles = snapshot.docs.map(doc => doc.data());
      setUserProfiles(profiles);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      text: messageInput,
      sender: 'current_user',
    };

    // Send the new message to Firestore
    firestore.collection('userProfiles').doc(selectedUser.id).collection('messages').add(newMessage)
      .then(() => {
        setSelectedUser(prevUser => ({
          ...prevUser,
          messages: [...prevUser.messages, newMessage],
        }));
        setMessageInput('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const handleOpenPersonalChat = (user) => {
    setSelectedUser(user);
    setShowPersonalChat(true);
  };

  return (
    <div>
      Chat App

    </div>

  );
}

export default RealTimeChat;