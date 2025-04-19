import nodemailer from "nodemailer"

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  EMAIL_RECIPIENT,
} = process.env

if (!EMAIL_RECIPIENT) throw new Error("EMAIL_RECIPIENT not defined")

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

export async function sendAllTodosCompletedEmail() {
  return transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_RECIPIENT,
    subject: "✅ All your todos are complete!",
    text: "Nice work! You’ve completed all items on your todo list.",
  })
}
