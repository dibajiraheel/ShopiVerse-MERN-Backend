import nodemailer from 'nodemailer'
import config from '../../config.js';


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "shopiverse99@gmail.com",
      pass: config.appPasswordGmail,
    },
  });
  

  const SendMail = async (email, subject, content) => {
    const info = await transporter.sendMail({
      from: 'shopiverse99@gmail.com',
      to: email,
      subject: subject,
      text: content
    })};

export default SendMail