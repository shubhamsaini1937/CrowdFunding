import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//DB Con
import connectToDB from "./config/db.js";
//Routing
import authRoute from "./routes/authRoutes.js";
import campaignRoute from "./routes/campaignRoutes.js";
import donorRoute from "./routes/donorRoutes.js";
//validation
import errorValidation from "./middelwares/errorValidation.js";
const app = express();
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB", extended: true }));
app.use(cors());
dotenv.config();
connectToDB();

// routing
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/campaign", campaignRoute);
app.use("/api/v1/donor", donorRoute);
app.use(errorValidation);
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

//Server Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${8000}`));
