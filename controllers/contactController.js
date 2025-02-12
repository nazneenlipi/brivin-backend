import Contact from "../models/Contact.js"
import nodemailer from "nodemailer"

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Save to MongoDB
    const newContact = new Contact({ name, email, message })
    await newContact.save()

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "brivin.int@gmail.com", // Your email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: "Contact form submitted successfully" })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    res.status(500).json({ message: "Error submitting contact form" })
  }
}

