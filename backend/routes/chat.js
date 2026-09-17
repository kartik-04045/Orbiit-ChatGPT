import express from "express";
import Thread from '../models/thread.js';
import getResponse from '../utils/openai.js';


const router =express.Router();



router.get("/try",async(req,res)=>{
    try{
        const thread = new Thread({
            threadId:"asd",
            title:"just a test"
        });

        const response=await thread.save();
        res.send(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"error"})
    }
})

router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error("THREAD FETCH ERROR:", err);
    res.status(500).json({ err: "Failed to fetch thread" });
  }
});

router.get("/thread/:threadId", async (req, res) =>{
    const {threadId}=req.params;
    try{
        const thread=await Thread.findOne({threadId});
        res.json(thread.messages);
    }
    catch (err) {
    console.error("THREAD FETCH ERROR:", err);
    res.status(500).json({ err: "Failed to fetch chat" });
  }
});


router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    console.log("DELETE REQUEST RECEIVED:", threadId);

    const deletedThread = await Thread.findOneAndDelete({
      threadId: threadId,
    });

    if (!deletedThread) {
      console.log("THREAD NOT FOUND:", threadId);

      return res.status(404).json({
        error: "Thread not found",
      });
    }

    console.log("THREAD DELETED:", threadId);

    return res.status(200).json({
      success: true,
      message: "Thread deleted successfully",
      threadId: threadId,
    });

  } catch (err) {
    console.error("DELETE THREAD ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to delete thread",
    });
  }
});


router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({
      error: "missing required fields",
    });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    // New chat
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    }

    // Existing chat

else {
  thread.messages.push({
    role: "user",
    content: message,
  });

  thread.updatedAt = new Date();
}


    // Send the COMPLETE conversation to Groq
    const reply = await getResponse(thread.messages);

    // Save Orbit's response
    thread.messages.push({
      role: "assistant",
      content: reply,
    });

    await thread.save();

    res.json({
      reply: reply,
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);

    res.status(500).json({
      err: "something went wrong",
    });
  }
});


export default router;


