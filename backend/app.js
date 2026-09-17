// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import chatRoutes from "./routes/chat.js";

// const app= express();
// const port=8080;

// app.use(express.json())
// app.use(cors())
// app.use("/api", chatRoutes);

// const connectDB= async()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("Connection successful Database");
//     }
//     catch(err){
//         console.log("Failed Database",err)
//     }
// }
// app.listen(port,()=>{
//     console.log("im listening");
//     connectDB();
// });




import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connection successful Database");
    } catch (err) {
        console.log("Failed Database", err);
    }
};

connectDB();

export default app;