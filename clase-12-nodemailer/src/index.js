import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import twilio from "twilio";

dotenv.config();

const app = express();
const PORT = 8080;
const __dirname = path.resolve();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.get("/", (req, res) => {
    res.send("Bienvenido al servidor de correos.");
});

app.get("/send-email", async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.GMAIL_USER}" <${process.env.GMAIL_USER}>`,
            to: "maxi_rosanda@hotmail.com", // list of recipients
            subject: "Prueba de envio de correos", // subject line
            text: "Prueba de envio de correos", // plain text body
            html: `
                    <h1>Prueba de envio de correos</h1>
                    <img src="cid:perro@nodemailer" />
                    <p>Prueba de envio de correos</p>
            `, // HTML body
             attachments: [
                {
                    filename: 'perro.jpg',
                    path: path.join(__dirname, '/src/img/perro.jpg'),
                    cid: 'perro@nodemailer' // unique identifier for this attachment
                }
            ],
        });
        res.json({message: "Correo enviado exitosamente"});
    } catch (err) {
        console.error("Error while sending mail:", err);
        res.json({message: "Error al enviar el correo"});
    }
});


app.get("/send-whatsapp", async (req, res) => {
    try {

        const response = await fetch(
            `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE}/messages/chat?token=${process.env.ULTRAMSG_TOKEN}&to=5491168179706&body=Hola desde Node`
        );

        const data = await response.json();

        console.log(data);

        if (data.error) {
            return res.json({
                success: false,
                error: data.error
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (err) {
        console.error(err);

        res.json({
            success: false,
            error: err.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
