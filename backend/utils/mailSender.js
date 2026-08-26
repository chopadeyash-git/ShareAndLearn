const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
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

        console.log('Mail sent successfully to - ', email);
        return info;
    }
    catch (error) {
        console.log('Error while sending mail (mailSender) - ', email, error);
    }
}

module.exports = mailSender;