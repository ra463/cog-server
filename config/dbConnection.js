const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Admin = require("../models/Admin");

const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.CONNECTION_STRING
    );
    console.log("Database connected: ", connection.host, connection.name);

    const checkAdmin = await Admin.countDocuments();

    if (!checkAdmin) {
      await Admin.create({
        fullName: "Admin",
        email: "admin@gmail.com",
        password: "Admin@11",
      });
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
