import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

function Chat({ loading }) {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= content.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <div className="chatContent">

      {/* Show only when there are NO messages */}
      {newChat && prevChats.length === 0 && (
        <div className="newChatHeading">
          <h1>Start a New Chat!</h1>
        </div>
      )}

      {/* Messages */}
      <div className="chats">

        {prevChats?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">
                {chat.content}
              </p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {/* Typing response */}
        {latestReply !== null && (
          <div className="gptDiv">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {latestReply}
            </ReactMarkdown>
          </div>
        )}

        {/* Loading dots */}
        {loading && (
          <div className="loadingIndicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

      </div>
    </div>
  );
}

export default Chat;