import React from "react";
import ChatApp from '../components/ChatPage/ChatApp';
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { RealTimeChat }  from "../components/ChatPage/RealTimeChat";
import { MagicLink } from "../components/ChatPage/MagicLink";
import { LoginPage } from "../components/ChatPage/LoginPage";




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