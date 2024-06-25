import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TradeRoutes from "./routes/TradeRoute.js";
import { config } from "dotenv";
import { connectToMongoDB } from "./config/db.js";

config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectToMongoDB();


app.use("/api/trades", TradeRoutes);




