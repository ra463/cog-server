const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary");

connectDb();
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const port = process.env.PORT || 5000;

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	max: 10000,
// 	message: "Too many request from this IP",
// });

// app.use(limiter);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/health", (req, res) => res.send(`Welcome to the server`));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/artist", require("./routes/artistRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
