import React from "react";
import { useState } from "react";
import "./chat.styles.css";
import hackerBot from "../../assets/HackerBot.png";
import { useRef } from "react";
import { useEffect } from "react";
import moment from "moment";
import { Fragment } from "react";
function Chat(props) {
  const [chatWith] = useState("Mirror Bot");
  const divRef = useRef(null);
  const [sentMessage, setTextMessage] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("mirrorbot")) {
      setTextMessage(JSON.parse(sessionStorage.getItem("mirrorbot")));
    }
  }, []);

  const handleClick = () => {
    if (message.current.value)
      setTextMessage([
        ...sentMessage,
        {
          message: message.current.value,
          timeStamp: new Date(),
        },
      ]);
    message.current.value = "";
  };
  useEffect(() => {
    divRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    sessionStorage.setItem("mirrorbot", JSON.stringify(sentMessage));
  }, [sentMessage]);
  const message = useRef("");
  return (
    <>
      <div className="container clearfix">
        <div className="chat">
          <div className="chat-header clearfix">
            <img src={hackerBot} alt="avatar" className="avatar-image" />

            <div className="chat-about">
              <div className="chat-with">{chatWith}</div>
              <div className="chat-num-messages">Online</div>
            </div>
            <i className="fa fa-star"></i>
          </div>
          <div className="chat-history">
            {sentMessage?.map(({ message, timeStamp }) => {
              return (
                <Fragment key={timeStamp}>
                  <div className="clearfix clearfix-message">
                    <div className="message other-message float-right">
                      {message}
                    </div>
                    <div className="message-data align-right">
                      <i className="fa fa-circle me">
                        <span className="message-data-name">You</span>
                        <span className="message-data-time">
                          {moment(timeStamp).format("MMMM Do, h:mm a")}
                        </span>
                      </i>
                    </div>
                  </div>
                  <div className="clearfix ">
                    <div className="message my-message">{message}</div>
                    <div className="message-data ">
                      <i className="fa fa-circle online">
                        <span className="message-data-name">Bot</span>
                        <span className="message-data-time">
                          {moment(timeStamp).format("MMMM Do, h:mm a")}
                        </span>
                      </i>
                    </div>
                  </div>
                </Fragment>
              );
            })}
            <div ref={divRef}></div>
          </div>
          <div />
          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows="3"
              ref={message}
            ></textarea>
            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
            <button onClick={handleClick}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
