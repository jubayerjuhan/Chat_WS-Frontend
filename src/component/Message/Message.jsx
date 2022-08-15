import moment from "moment";
import React from "react";
import "./Message.scss";

const Message = ({ me, message, time, user }) => {
  return (
    <div className={me ? "messageWrapper" : ""}>
      <div className={`message ${me ? "mymessage" : ""}`}>
        <img src="https://picsum.com/400" alt="" className="avater" />
        <div className={me ? "message_me" : "message-recieved"}>
          <p className="time">{moment(time).format("LLL")}</p>
          <p className="sender">{user}</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
