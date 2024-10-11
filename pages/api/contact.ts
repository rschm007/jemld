// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message, subject } = req.body;

        // Create a Nodemailer transporter using your email service (e.g., Gmail, SMTP)
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // Use 465 for SSL
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USER, // your Gmail address
                pass: process.env.EMAIL_PASS, // the generated App Password
            },
            logger: true, // Log SMTP activity to the console
            debug: true, // Enable debug output
        });

        try {
            // Send the email
            await transporter.sendMail({
                from: email, // Sender's email
                to: "jemlightdesign@gmail.com", // Recipient's email
                subject: `New Contact Form Submission from ${name}`, // Email subject
                text: message, // Plain text body
                html: `
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`, // HTML body
            });

            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', error: error.toString() });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
