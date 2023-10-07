import React, { useState } from 'react';
import RealTimeChat from './RealTimeChat.jsx';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showPersonalChat, setShowPersonalChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProfiles, setUserProfiles] = useState([
    { id: 1, name: 'User 1', lastMessage: 'Hello', messages: [] },
    { id: 2, name: 'User 2', lastMessage: 'Hi there', messages: [] },
    { id: 3, name: 'User 3', lastMessage: 'Hey, Whatsup', messages: [] },
    { id: 4, name: 'User 4', lastMessage: 'How are you', messages: [] },
    { id: 5, name: 'User 5', lastMessage: 'Heyy!', messages: [] },
    // Add more user profiles as needed
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      text: messageInput,
      sender: 'current_user',
    };

    if (selectedUser) {
      const updatedUserProfiles = userProfiles.map((user) =>
        user.id === selectedUser.id
          ? { ...user, messages: [...user.messages, newMessage] }
          : user
      );
      setUserProfiles(updatedUserProfiles);
    }

    setMessageInput('');
  };

  const handleOpenPersonalChat = (user) => {
    setSelectedUser(user);
    setShowPersonalChat(true);
  };

  return (
    <div className="chat-container bg-white">
      <div className="chat-sidebar">
        <h3>Chat Profiles</h3>
        <ul className="ml-10">
          {userProfiles.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <div>
                <button
                  onClick={() => handleOpenPersonalChat(user)}
                  className="profile-button text-black p-3 rounded-full"
                >
                  {user.name}
                </button>
                <div>Last message: {user.lastMessage}</div>
              </div>
              <button
                onClick={() => handleOpenPersonalChat(user)}
                className="message-button bg-green-400 text-black p-2 rounded-2xl pr-5 mr-24 flex items-center"
              >
                <span className="ml-5"> Message </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showPersonalChat && selectedUser ? (
        <div className="personal-chat-box">
          <h2>Chat with {selectedUser.name}</h2>
          <RealTimeChat /> {/* Include the RealTimeChat component */}
          <div className="chat-input">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-md border border-gray-300"
            />
            <button onClick={handleSendMessage} className="bg-green-500 text-black p-2 rounded-lg ml-2">
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="welcome-message">Select a profile to start a chat</div>
      )}
    </div>
  );
}

export default ChatApp;
