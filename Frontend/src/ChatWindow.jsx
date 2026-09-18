import "./ChatWindow.css";
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";

function ChatWindow() {
  const {
  prompt,
  setPrompt,
  reply,
  setReply,
  currThreadId,
  setPrevChats,
  setNewChats
} = useContext(MyContext);
  const [loading, setLoading]=useState(false);

  const getReply = async () => {
  if (!prompt.trim()) return;

  setLoading(true);

  const userMessage = prompt;

  setNewChats(false);



  // Show user message immediately
  setPrevChats((prevChats) => [
    ...prevChats,
    {
      role: "user",
      content: userMessage,
    },
  ]);

  // Clear input
  setPrompt("");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage,
      threadId: currThreadId,
    }),
  };

  try {
    const response = await fetch(
      "https://orbiit-backend.onrender.com/api/chat",
      options
    );

    const res = await response.json();

    console.log(res);

    setReply(res.reply);
  } catch (err) {
    console.log(err);
  }

  setLoading(false);
};

 useEffect(() => {
  if (reply) {
    setPrevChats((prevChats) => [
      ...prevChats,
      {
        role: "assistant",
        content: reply,
      },
    ]);
  }
  }, [reply]);


  return (
    <div className="chatWindow">
      
      <Chat loading={loading} />

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder="Ask Orbit anything..." 
            value={prompt} 
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyDown={(e)=>e.key==='Enter'? getReply():''}>
          
          </input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <p className="info">
          Orbit may contain occasional inaccuracies. Please verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
