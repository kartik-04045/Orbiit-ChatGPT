import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
  const { allThreads, setAllThreads, currThreadId,setNewChats, setPrompt,setReply,setCurrThreadId,setPrevChats} = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData)
      console.log(res);
      // threadId, title
    } catch (err) {
      console.log(err);
    }
  };

  const createNewChat = () => {
    setNewChats(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`
      );
      const res = await response.json();
      console.log(res.messages);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);

    } catch (err) {
      console.log(err);
    }
  };
const deleteThread = async (threadId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/thread/${threadId}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Failed to delete thread");

    // Update local state instantly
    setAllThreads(prev =>
      prev.filter(thread => thread.threadId !== threadId)
    );

    // If you deleted the active thread, reset
    if (currThreadId === threadId) {
      setCurrThreadId(null);
      setPrevChats([]);
      setNewChats(true);
    }
    navigate("http://localhost:5173");

  
  } catch (err) {
    console.error("Delete error:", err);
  }
};


  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="src/assets/logo2.png" alt="gpt logo" className="logo" />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

    <ul className="history">
      {
        allThreads?.map((thread,idx)=>(
        <li key={idx} onClick={()=>changeThread(thread.threadId)}>{thread.title}<i
        className="fa-solid fa-trash"
            onClick={(e) => {
              e.stopPropagation(); // stop event bubbling
              deleteThread(thread.threadId);
            }}
      ></i></li>
        ))
      }
    </ul>

    <div className="sign">
      <p>Akhilesh &hearts;</p>
    </div>
</section>
  );
}

export default Sidebar;
