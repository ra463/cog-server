const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, employeeId, email } = req.body;

    if (!firstname || !lastname || !employeeId || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      employeeId,
      email,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        employeeId: newUser.employeeId,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { registerUser };
