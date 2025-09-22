import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "kunal@kunal.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "veriry you email" : "Reset your password",
      html: "<b>Hello world?</b>", // HTML body
    };

    const mailResponse = await transporter.sendMail(mailOptions)

    return mailResponse
  } catch (error:any) {
    throw new Error(error.message)
  }
};
