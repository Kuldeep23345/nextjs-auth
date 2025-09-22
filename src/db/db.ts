import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb connected");
    });
    connection.on("error", (err) => {
      console.log(
        "mongodb connection error, please make sure db is up and running" + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Mongodb connection error", error);
  }
};
