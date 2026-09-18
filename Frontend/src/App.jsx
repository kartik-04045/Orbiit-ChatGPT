import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import {v1 as uuidv1} from "uuid";

function App() {
    const [prompt, setPrompt]=useState("");
    const [reply,setReply]=useState(null);
    const [currThreadId, setCurrThreadId]= useState(uuidv1());
    const [prevChats, setPrevChats]=useState([]);
    const [newChat, setNewChats]=useState(true);
    const [allThreads,setAllThreads]=useState([]);

    const providerValue={
        prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        newChat, setNewChats,
        prevChats,setPrevChats,
        allThreads,setAllThreads
    }; 
   return (
    
    <div className="main">
        <MyContext.Provider value={providerValue}>
            <Sidebar></Sidebar>
            <ChatWindow></ChatWindow>
        </MyContext.Provider>  
    </div>
  );
}

export default App;