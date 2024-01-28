const nodemailer = require("nodemailer");
const APIError = require("./errors");

const sendEmail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
    })

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Hata Çıktı Mail Gönderilemedi : ", error);
            
        }
        console.log("info : ",info);
        return true
    })
}

module.exports = sendEmail