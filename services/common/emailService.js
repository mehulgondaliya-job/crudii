const nodemailer = require('nodemailer');

// Create a transporter object using Ethereal SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'brian.schmitt26@ethereal.email',
    pass: '7aH34AJuXQ3rnKAdHD',
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: 'brian.schmitt26@ethereal.email', // Use the Ethereal email address
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    logger.error('Error sending email: ' + error.message);
  }
};

module.exports = { sendEmail };
