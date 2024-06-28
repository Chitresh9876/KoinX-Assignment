// const express = require("express");
import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Trade from "../models/TradeSchema.js";


const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Upload the data 
router.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const trades = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const [baseCoin, quoteCoin] = row["Market"].split("/");
      trades.push({
        utcTime: new Date(row["UTC_Time"]),
        operation: row["Operation"],
        baseCoin: baseCoin,
        quoteCoin: quoteCoin,
        amount: parseFloat(row["Buy/Sell Amount"]),
        price: parseFloat(row["Price"]),
      });
    })
    .on("end", async () => {
      try {
        await Trade.insertMany(trades);
        res
          .status(200)
          .json({ message: "File uploaded and data stored successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      } finally {
        fs.unlinkSync(filePath);
      }
    });
});


//Fetch the balance
router.post("/balance", async (req, res) => {
  const { timestamp } = req.body;
  const targetDate = new Date(timestamp);

  try {
    const trades = await Trade.find({ utcTime: { $lte: targetDate } });
    const balances = {};
    trades.forEach((trade) => {
      const { baseCoin, operation, amount } = trade;
      if (!balances[baseCoin]) {
        balances[baseCoin] = 0;
      }
      balances[baseCoin] += operation === "Buy" ? amount : -amount;
    });

    res.status(200).json(balances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
