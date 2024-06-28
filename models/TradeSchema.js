import mongoose from "mongoose";

const TradeSchema = new mongoose.Schema({
  utcTime: { type: Date, required: true },
  operation: { type: String, required: true },
  baseCoin: { type: String, required: true },
  quoteCoin: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Trade = mongoose.model("Trade", TradeSchema);

export default Trade;
