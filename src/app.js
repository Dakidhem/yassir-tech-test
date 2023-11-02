import express from "express";
import DbConnection from "./config/db.config.js";
import api from "./routes/api.js";

const app = express();

const port = 3001;

app.use(express.json());

DbConnection();

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
