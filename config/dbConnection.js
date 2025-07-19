const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Admin = require("../models/Admin");
// const MailTemplate = require("../models/mailTemplates");

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

    // const template = await MailTemplate.countDocuments({});
    // if (!template) {
    //   await MailTemplate.insertMany([
    //     {
    //       templateEvent: "send-forgot-otp",
    //       subject: "Reset Password OTP",
    //       mailVariables: "%fullName% %email% %phone% %OTP%",
    //       htmlBody: `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>Forgot Password Request</title><style>body{font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:20px;}.container{max-width:500px;background:#fff;padding:20px;margin:auto;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1);}.header{text-align:center;color:#333;}.otp{font-size:24px;font-weight:bold;color:#007bff;text-align:center;padding:10px;border:2px dashed #007bff;display:inline-block;margin:20px auto;}.footer{margin-top:20px;font-size:14px;text-align:center;color:#666;}</style></head><body><div class='container'><h2 class='header'>Forgot Password Request</h2><p>Hi %fullName%,</p><p>You have requested to reset your password. Please use the OTP below to proceed:</p><div class='otp'>%OTP%</div><p>If you did not request a password reset, please ignore this email.</p><p class='footer'>Best Regards,<br>The Down South Self Storage Team</p></div></body></html>`,
    //       textBody: "Reset Password OTP: %OTP%",
    //     },
    //   ]);
    // }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
