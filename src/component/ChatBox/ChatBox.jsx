import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../index.tsx";
import { formatMessage } from "../../utils/message/formatMessage.js";
import ChatHeader from "../ChatHeader/ChatHeader.jsx";
import Message from "../Message/Message.jsx";
import "./ChatBox.scss";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatsElement = useRef();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // getting the room name from url
  const { search } = useLocation();
  const room = getRoomName(search);

  // function to split room name from url
  function getRoomName(url) {
    return new URLSearchParams(url).get("room");
  }

  // use effect to scroll to bottom of chat and get the chat history
  useEffect(() => {
    socket.on("message", (newMessage) => {
      if (newMessage) {
        setMessages([...messages, newMessage]);
        console.log(messages, "messages");
      }
    });
  }, [message, messages]);

  // handle message submit
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const getFormattedMessage = formatMessage(
      user?.displayName ? user.displayName : "Anynomous",
      message
    );

    socket.emit("chatMessage", getFormattedMessage);
    setMessages([...messages, getFormattedMessage]);
    chatsElement.current.scrollTop = chatsElement.current.scrollHeight;
  };

  // if there is no user then redirect to login page
  if (!user) return navigate("/");

  return (
    <div className="chatBox">
      <ChatHeader name={room} />
      <div className="chats" ref={chatsElement}>
        {/* <Message />
        <Message me={true} /> */}

        {messages.map((message, index) => (
          <Message
            me={message.username === user.displayName}
            key={index}
            message={message.text}
            user={message.username}
            time={message.time}
          />
        ))}
      </div>
      <div>
        <form action="" className="send-message" onSubmit={handleMessageSubmit}>
          <input
            placeholder="Type a message..."
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={handleMessageSubmit}>Send</button>
        </form>
        {/* </form> */}
      </div>
    </div>
  );
};

export default ChatBox;
