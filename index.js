const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const getDbConnect = require("./configuration/database");
const userRoute = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Netflix clone home runnig",
  });
});

// stabilisg DB Connection
getDbConnect();
app.listen(PORT, () => {
  console.log(`Server start on the port  ${PORT} `);
});
