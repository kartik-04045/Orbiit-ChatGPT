import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {

  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChats,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  // Stores the chat that user wants to delete
  const [deleteChat, setDeleteChat] = useState(null);

  const getAllThreads = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/thread"
      );

      const res = await response.json();

      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);

    } catch (err) {
      console.log(err);
    }
  };


  // ================================
  // CREATE NEW CHAT
  // ================================

  const createNewChat = () => {

    setNewChats(true);
    setPrompt("");
    setReply(null);

    setCurrThreadId(uuidv1());

    setPrevChats([]);
  };


  // ================================
  // OPEN PREVIOUS CHAT
  // ================================
const changeThread = async (newThreadId) => {
  setCurrThreadId(newThreadId);

  // Move clicked chat to the top
  setAllThreads((prevThreads) => {
    const clickedThread = prevThreads.find(
      (thread) => thread.threadId === newThreadId
    );

    const remainingThreads = prevThreads.filter(
      (thread) => thread.threadId !== newThreadId
    );

    return clickedThread
      ? [clickedThread, ...remainingThreads]
      : prevThreads;
  });

  try {
    const response = await fetch(
      `http://localhost:8080/api/thread/${newThreadId}`
    );

    const res = await response.json();

    setPrevChats(res);
    setNewChats(false);
    setReply(null);
  } catch (err) {
    console.log(err);
  }
};

  // ================================
  // DELETE CHAT
  // ================================

  const deleteThread = async (threadId) => {
  try {
    console.log("Deleting:", threadId);

    const response = await fetch(
      `http://localhost:8080/api/thread/${threadId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log("Delete response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete thread");
    }

    // Remove it from sidebar immediately
    setAllThreads((prev) =>
      prev.filter((thread) => thread.threadId !== threadId)
    );

    // If the deleted chat is currently open
    if (currThreadId === threadId) {
      setCurrThreadId(uuidv1());
      setPrevChats([]);
      setReply(null);
      setPrompt("");
      setNewChats(true);
    }

    // Close confirmation popup
    setDeleteChat(null);

  } catch (err) {
    console.error("Delete error:", err);
  }
};


  // ================================
  // GET ALL THREADS
  // ================================

  useEffect(() => {
    getAllThreads();
  }, []);


  return (

    <section className="sidebar">


      {/* ============================
          LOGO
      ============================ */}

      <div className="sidebarTop">

        <button
          className="logoButton"
          onClick={createNewChat}
        >

          <img
            src="/src/assets/logo2.png"
            alt="Orbit logo"
            className="logo"
          />

          <div className="brandText">

            <span className="brandName">
              Orbit
            </span>

            <span className="brandSubtitle">
              Your AI Assistant
            </span>

          </div>

          <i className="fa-solid fa-pen-to-square editIcon"></i>

        </button>

      </div>


      {/* ============================
          NEW CHAT BUTTON
      ============================ */}

      <button
        className="newChatButton"
        onClick={createNewChat}
      >

        <i className="fa-solid fa-plus"></i>

        <span>
          New Chat
        </span>

      </button>


      {/* ============================
          PREVIOUS CHATS
      ============================ */}

      <div className="historyHeader">

        <span>
          Previous Chats
        </span>

      </div>


      <ul className="history">

        {allThreads?.map((thread) => (

          <li
            key={thread.threadId}
            className={
              currThreadId === thread.threadId
                ? "activeThread"
                : ""
            }
            onClick={() =>
              changeThread(thread.threadId)
            }
          >

            <div className="threadTitle">

              <i className="fa-regular fa-message"></i>

              <span>
                {thread.title}
              </span>

            </div>


            {/* DELETE ICON */}

            <i
              className="fa-solid fa-trash deleteIcon"
              onClick={(e) => {

                // Don't open the chat
                e.stopPropagation();

                // Open confirmation popup
                setDeleteChat(thread);

              }}
            ></i>

          </li>

        ))}

      </ul>


      {/* ============================
          USER
      ============================ */}

      <div className="sign">

        <div className="userCircle">

          <i className="fa-regular fa-user"></i>

        </div>

        <p>
          Kartik <span>♥</span>
        </p>

      </div>


      {/* ============================
          DELETE CONFIRMATION POPUP
      ============================ */}

      {deleteChat && (

        <div
          className="deleteOverlay"
          onClick={() => setDeleteChat(null)}
        >

          <div
            className="deleteModal"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>
              Delete chat?
            </h2>


            <p>
              This will delete{" "}
              <strong>
                {deleteChat.title}
              </strong>
              .
            </p>


            <div className="deleteButtons">

              <button
                className="cancelButton"
                onClick={() =>
                  setDeleteChat(null)
                }
              >
                Cancel
              </button>


              <button
                className="confirmDeleteButton"
                onClick={() =>
                  deleteThread(deleteChat.threadId)
                }
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default Sidebar;