import React, { useEffect, useRef, useState } from "react";
// import * as timeago from 'timeago.js';
import './chat.css';

const Chat = ({ openModalChat, setOpenModalChat }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const textareaRef = useRef();

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      isMounted = false;
    }
  }, [openModalChat, messages]);

  const sendMessage = () => {
    if (textareaRef.current.value || file) {
      setMessages(prev => [...prev, { id: messages.length + 1, msg: textareaRef.current.value, date: Date.now(), file: file, me: true }]);
      setTimeout(() => {
        textareaRef.current.value = "";
        textareaRef.current.focus();
        setFile(null);
      }, 100);
    }
  }

  const sendEnterClick = (e) => {
    // if (e.code === "Enter") {
    //   sendMessage();
    // }
  }

  return (
    openModalChat && (
      <div className="chat">
        <div className="chatWrapper">
          <div className="chatTop">
            <span>Adminga murojaat</span>
            <i className="material-icons" onClick={() => setOpenModalChat(false)}>&#xe5cd;</i>
          </div>
          <div className="chatCenter" >
            <div className="chatCenterWrapper">
              <h4 className="text-center" style={{ fontSize: "14px", color: "silver" }}>Ведутся технические работы</h4>
              {messages.length > 0 && messages.map((m) => (
                m.me ? (
                  <div className="userData" ref={scrollRef}>
                    <p style={{ backgroundColor: m.file && "whitesmoke", color: m.file && "#000" }}>
                      {m.file && (
                        <img src={URL.createObjectURL(m.file)} alt="" className="contentImg" />
                      )}
                      {m.msg}
                    </p>
                    <img src="/assets/user.png" alt="" />
                    {/* <span className="timeago">{timeago.format(m.date)}</span> */}
                  </div>
                ) : (
                  <div className="userDataAdmin" ref={scrollRef}>
                    <img src="/assets/user.png" alt="" />
                    <p style={{ backgroundColor: m.file && "whitesmoke", color: m.file && "#000" }}>
                      {m.file && (
                        <img src={URL.createObjectURL(m.file)} alt="" className="contentImg" />
                      )}
                      {m.msg}
                    </p>
                    {/* <span className="timeago">{timeago.format(m.date)}</span> */}
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="chatBottom">
            {file && (
              <div className="chatBottomTop">
                <img src={URL.createObjectURL(file)} alt="" />
                <span>{file?.name}</span>
              </div>
            )}
            <div className="chatBottomBottom">
              <label htmlFor="clickCamera">
                <i className="material-icons camera">&#xe412;</i>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="clickCamera"
                  accept=".png, .jpg, .jpeg"
                  onClick={(e) => e.target.value = null}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <textarea rows="2" placeholder="Xabar matni" autoFocus ref={textareaRef} onKeyDown={sendEnterClick}></textarea>
              <i className="material-icons sendIcon" onClick={sendMessage} >&#xe163;</i>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(Chat);