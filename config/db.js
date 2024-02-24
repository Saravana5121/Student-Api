import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("successfully connected to mongodb");
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
