const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message} = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'men270992@gmail.com',
         pass: 'malpdyflihhbdrvp'
      }
    });
  
    const mailOptions = {
      from: 'men270992@gmail.com',
      to: email,
      subject: 'Booking for cars ',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.send('Email sent successfully');
      }
    });
  });
  
  app.use(cors({
  credentials:true,
  origin:"http://localhost:3000"
}));

const port = process.env.PORT || 5023;

app.listen(port, () => console.log(`Server running on port ${port}`));
