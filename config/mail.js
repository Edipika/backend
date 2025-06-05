const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendConfirmationMail = async (toEmail, orderNumber, totalAmount) => {
  await transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to: toEmail,
    subject: "Order Confirmation",
    html:`
      <h2>Thank you for your order!</h2>
      <p>We’re excited to let you know that your order <strong>#${orderNumber}</strong> has been successfully placed.</p>
      <p>Of Amount <strong>Rs.${totalAmount}</strong></p>
    `,
  });
};

module.exports = {
  sendConfirmationMail,
};
