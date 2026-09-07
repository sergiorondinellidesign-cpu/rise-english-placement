const nodemailer = require("nodemailer");
const { buildEmailHtml } = require("./emailTemplate");

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendResultEmail({ to, name, levelCode, levelLabel, breakdown }) {
  const transporter = getTransporter();
  const fromName = process.env.EMAIL_FROM_NAME || "Rise";

  await transporter.sendMail({
    from: `"${fromName}" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Seu resultado no teste de nivelamento de inglês",
    html: buildEmailHtml({ name, levelCode, levelLabel, breakdown }),
  });
}

module.exports = { sendResultEmail };
