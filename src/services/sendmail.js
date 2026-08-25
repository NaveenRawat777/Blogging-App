import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser || "verification@DowIt.com";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
});

export const sendEmail = async (email, subject, emailTemplate) => {
  if (!email || !subject || !emailTemplate) {
    throw new Error("Email details are required");
  }

  if (!smtpUser || !smtpPass) {
    throw new Error(
      "SMTP credentials are not configured. Set SMTP_USER and SMTP_PASS in your environment.",
    );
  }

  try {
    const info = await transporter.sendMail({
      from: `"DowIt"<${smtpFrom}>`,
      to: email,
      subject,
      html: emailTemplate,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error while sending mail", error);
    throw new Error(`Failed to send email: ${error.message || error}`);
  }
};
