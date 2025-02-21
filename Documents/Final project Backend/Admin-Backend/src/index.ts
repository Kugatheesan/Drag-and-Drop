import express from "express";
import cors from "cors";
import router from "./router/userRouter";
import routers from "./router/serviceRouter";
import bookrouter from "./router/bookiRouter"

const app = express();

app.use(cors());

app.use(express.json());

// Use API routes
app.use("/api", router);//user
app.use("/api",routers);//service
app.use("/api",bookrouter)//book


// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

