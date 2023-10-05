import React from "react";
import ChatApp from '../components/Chatpage/ChatApp';
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";




function Chat() {
  return (
    <div>
      <DefaultLayout>
      <h1 class="text-black text-xl ml-6 pt-4 pb-4">Chats</h1>
      <ChatApp /> 
      </DefaultLayout>  
      <Navbar />    
    </div>
    
  );
}

export default Chat;