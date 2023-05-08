import React from "react";
import { useState } from "react"; 
import Chat from "../../chat.js"; // Import the Chat component

const Messaging = () => { 
  return ( 
    <div className="messagingContent"> 
      <Chat /> 
      <div className="sendingMessages"> 
        Sending messages
      </div>
    </div>
  );
} 

export default Messaging;
