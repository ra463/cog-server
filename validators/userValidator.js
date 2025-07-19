const { check } = require("express-validator");

exports.userValidationRules = [
  check("firstname").notEmpty().withMessage("First name is required"),
  check("lastname").notEmpty().withMessage("Last name is required"),
  check("employeeId").notEmpty().withMessage("Employee ID is required"),
  check("email").isEmail().withMessage("Valid email is required"),
];
