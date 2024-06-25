import mongoose from "mongoose";

export const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(console.log(`Connected to MONGODB Successfully`))
    .catch((err) => {
      console.log(err);
    });
};
