const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");

const adminLogin = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, isDeleted: false }).lean();
  if (!admin) return res.status(400).send({ message: "Admin not found" });

  if (!admin.matchPassword(password)) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const adminField = {
    _id: admin._id,
    email: admin.email,
  };

  const token = jwt.sign({ user: adminField }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  await Admin.updateOne(
    { _id: admin._id, isDeleted: false },
    {
      $unset: { OTP: "" },
      $push: { tokens: token },
    }
  );

  return res.status(400).send({ message: "Login successfull" });
});

const logOut = catchAsyncError(async (req, res) => {
  const { 1: token } = req.headers.authorization.split(" ");
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  await Admin.updateOne(
    { _id: decodeToken.user._id },
    { $pull: { tokens: token } }
  );
  return res.status(200).send({ message: "Logout successfull" });
});

module.exports = { adminLogin, logOut };
