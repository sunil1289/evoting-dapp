
import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./chatbot.css";
import ActionProvider from "../../components/chatbot/ActionProvider";
import config from "../../components/chatbot/config";
import MessageParser from "../../components/chatbot/MessageParser";
import ErrorBoundary from "../../components/chatbot/ErrorBoundary";
import chatbotIcon from "./chatbot.png";


const ChatBot = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "25px",
          bottom: "55px",
          boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
          zIndex: 1000,
        }}
      >
        {showChatbot && (
          <ErrorBoundary>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </ErrorBoundary>
        )}
      </div>
      <button
  className="app-chatbot-button"
  onClick={() => setShowChatbot(!showChatbot)}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "70px",
    height: "70px",
    backgroundColor: "#ffffff",
    border: "2px solid #ccc",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "10px",
    zIndex: 1000,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease-in-out",
    overflow: "hidden",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  <img
    src={chatbotIcon}
    alt="Chatbot Icon"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover", 
      borderRadius: "50%",
    }}
  />


  <div className="dot-throw dot-1">.</div>
  <div className="dot-throw dot-2">.</div>
  <div className="dot-throw dot-3">.</div>
</button>

    </>
  );
};

export default ChatBot;
