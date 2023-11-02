import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DbConnection = async () => {
  const dbURI = process.env.LOCAL_DB;
  mongoose.connect(`${dbURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Successfully connected to the database");
  });

  db.on("error", (error) => {
    console.log("Error occured when connecting to the database:", error);
  });
};

export default DbConnection;
