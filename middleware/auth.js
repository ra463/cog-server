const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const validateAdminToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const { 1: token } = req.headers.authorization.split(" ");

      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          return res.status(401).send({ message: "Please do re-login" });
        }

        const admin = await Admin.findOne(
          { _id: verifiedJwt.user._id, isDeleted: false },
          { fullName: 1, role: 1, tokens: 1, email: 1 }
        ).lean();
        if (!admin) return res.status(400).send({ message: "Admin not found" });

        if (admin?.tokens) {
          const isTokenPresent = admin.tokens.find((item) => item === token);
          if (!isTokenPresent)
            return res.status(401).send({ message: "Please do re-login" });

          const adminField = {
            _id: admin._id,
            role: admin.role,
            artistName: admin.artistName,
            email: admin.email,
          };

          req.user = adminField;
          return next();
        }

        return res.status(401).send({ message: "Please Login" });
      });
    } else {
      return res.status(401).send({ message: "Please Login" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: error, message: "Something went wrong" });
  }
};

module.exports = validateAdminToken;
