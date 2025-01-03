import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const TYPEBOT_API_URL = "https://typebot.io/api/v1/typebots";
  const PUBLIC_ID = "your_public_id";

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, isUser: true },
    ]);
    setInputMessage("");

    try {
      let response;
      if (!sessionId) {
        // Initial API call to start the chat
        response = await axios.post(`${TYPEBOT_API_URL}/${PUBLIC_ID}/startChat`, {
          message: inputMessage,
        });
        setSessionId(response.data.sessionId);
      } else {
        // API call to continue the chat
        response = await axios.post(
          `${TYPEBOT_API_URL}/${PUBLIC_ID}/continueChat`,
          {
            sessionId,
            message: inputMessage,
          }
        );
      }

      const botMessages = response.data.messages.map((msg) => ({
        text: msg.content.richText[0].children
          .map((child) => child.text)
          .join(" "),
        isUser: false,
      }));

      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error("Error in chat flow:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "An error occurred. Please try again.", isUser: false },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.isUser ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input-field"
        />
        <button onClick={handleSendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
