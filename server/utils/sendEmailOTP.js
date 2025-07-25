import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

const sendEmailOTP = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>OTP Verification</h2><p>Your OTP is: <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    };

    await transporter.verify(); // Verify transporter configuration
    console.log("Email transporter verified successfully");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Failed to send email to:", email, "Error:", error.message);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

export { generateOTP, sendEmailOTP };