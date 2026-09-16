import "./ChatWindow.css";
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
  const {prompt,setPrompt,reply,setReply,currThreadId,setCurrThreadId, prevChats,setPrevChats}=useContext(MyContext);
  const [loading, setLoading]=useState(false);

  const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat",options);
      const res=await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prevChats => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
  }

  setPrompt("");
}, [reply]);


  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          <span>Orbit <i className="fa-solid fa-chevron-down"></i></span>
        </span>

        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-regular fa-user"></i>
          </span>
        </div>
      </div>
      
      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder="Ask whatever" 
            value={prompt} 
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyDown={(e)=>e.key==='Enter'? getReply():''}>
          
          </input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <p className="info">
          Orbit may contain occasional inaccuracies. The data is current as of October 2023. Please refer to Cookie Preferences
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
