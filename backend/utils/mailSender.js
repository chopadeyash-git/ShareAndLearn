const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    // Use Brevo HTTP API if API key is available (Best for Render without domain verification)
    if (process.env.BREVO_API_KEY) {
        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { email: process.env.MAIL_USER, name: "Share And Learn" },
                    to: [{ email: email }],
                    subject: title,
                    htmlContent: body
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.log('Brevo error - ', email, error);
                return null;
            }

            const data = await response.json();
            console.log('Mail sent successfully (Brevo) to - ', email);
            return data;
        }
        catch (error) {
            console.log('Error while sending mail (Brevo) - ', email, error);
        }
    }
    // Use Resend HTTP API if API key is available
    else if (process.env.RESEND_API_KEY) {
        try {
            const resend = new Resend(process.env.RESEND_API_KEY);

            const { data, error } = await resend.emails.send({
                from: 'Share And Learn <onboarding@resend.dev>',
                to: email,
                subject: title,
                html: body
            });

            if (error) {
                console.log('Resend error - ', email, error);
                return null;
            }

            console.log('Mail sent successfully (Resend) to - ', email);
            return data;
        }
        catch (error) {
            console.log('Error while sending mail (Resend) - ', email, error);
        }
    }
    // Fallback to Gmail SMTP for local development
    else {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: process.env.MAIL_HOST,
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                },
                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 10000,
            });

            const info = await transporter.sendMail({
                from: `"Share And Learn || By Yash Productions" <${process.env.MAIL_USER}>`,
                to: email,
                subject: title,
                html: body
            });

            console.log('Mail sent successfully (SMTP) to - ', email);
            return info;
        }
        catch (error) {
            console.log('Error while sending mail (SMTP) - ', email, error);
        }
    }
}

module.exports = mailSender;