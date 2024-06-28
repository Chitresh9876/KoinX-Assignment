import mongoose from "mongoose";

export const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log(`Connected to MONGODB Successfully`))
    .catch((err) => {
      console.log(err);
    });
};
