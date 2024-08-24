"use server";
import { Resend } from "resend";

export default async function sendEmail(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const response = await resend.emails.send({
    from: `${formData.get("fname")} ${formData.get("lname")} <${process.env.MAIL}>`,
    to: process.env.MAIL as string,
    subject: "Contact Form Submission",
    text: `From: ${formData.get("email")}\n\n${formData.get("message")}\n\n${formData.get("fname")} ${formData.get("lname")}`,
  });

  return !response.error;
}
