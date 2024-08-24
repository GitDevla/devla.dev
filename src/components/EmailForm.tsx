"use client";

import sendEmail from "@/actions/sendEmail";

export default function EmailForm() {
  async function send(formData: FormData) {
    const success = await sendEmail(formData);
    if (!success) alert("An error occurred while sending the email.");
    else alert("Email sent successfully!");
  }

  return (
    <form className="grid grid-cols-2 gap-4" action={send}>
      <div>
        <label htmlFor="fname" className="mb-2 text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="card w-full"
          placeholder="John"
          required
        />
      </div>
      <div>
        <label htmlFor="lname" className="mb-2 text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lname"
          name="lname"
          className="card w-full"
          placeholder="Doe"
          required
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="email" className="mb-2 text-sm font-medium">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="card w-full"
          placeholder="john.doe@mail.com"
          required
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="message" className="mb-2 text-sm font-medium">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          className="card h-32 w-full resize-none"
          placeholder="Write your message here"
          required
        />
      </div>
      <div>
        <input type="submit" className="card w-full" value="Send" />
      </div>
    </form>
  );
}
