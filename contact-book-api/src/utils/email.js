const { text } = require("express");
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  });

  const mailOptions = {
    from: "Mriganka Mahanta <mrigank195@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
