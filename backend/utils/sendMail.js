const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  console.log("🚀 Sending email...");
  console.log("Host:", process.env.SMPT_HOST);
  console.log("Port:", process.env.SMPT_PORT);
  console.log("Mail:", process.env.SMPT_MAIL);

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST || "smtp.elasticemail.com",
    port: process.env.SMPT_PORT || 2525,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent:", result);
  } catch (err) {
    console.error("❌ Mail error:", err);
  }
};

module.exports = sendMail;
