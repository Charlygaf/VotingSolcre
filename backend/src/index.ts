const express = require("express");
const cors = require("cors");
require("dotenv").config();
const candidatesRoutes = require("./routes/candidates");
const voteRoutes = require("./routes/vote");
const authRoutes = require("./routes/auth");
const resultsRoutes = require("./routes/results");
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: ExpressRequest, res: ExpressResponse) => {
  res.send("Voting System Backend is running");
});
app.use("/auth", authRoutes);

app.use("/vote", voteRoutes);

app.use("/candidates", candidatesRoutes);

app.use("/results", resultsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
