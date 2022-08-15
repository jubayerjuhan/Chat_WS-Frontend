import React from "react";
import "./ChatHeader.scss";
const ChatHeader = ({ name }) => {
  return (
    <div className="header">
      <div className="img">
        <img src="http://picsum.com/40" alt="" />
      </div>
      <div className="chatInfo">
        <p className="userName">{name}</p>
        <div className="activeIndicator">
          <p className="active">Active Now</p>
          <div className="greenDot"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
