const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    // Use Resend HTTP API if API key is available (works on Render/cloud)
    if (process.env.RESEND_API_KEY) {
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
                port: 465,
                secure: true,
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