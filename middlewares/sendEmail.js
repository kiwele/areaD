import nodemailer from 'nodemailer';

const sendEMail = async (userEmail, textm) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.HOST,
      pass: process.env.PWD,
    },
  });

  const mailOptions = {
    from: process.env.HOST,
    to: userEmail,
    subject: 'PAMOJA MANAGEMENT PORTAL',
    html: `<p>Dear ${userEmail} your account is successifully created in Pamoja foundation management portal
         use this password "${textm}"  to sign in 
     <span><a href="http://localhost:3000/"> Click here </a></span>  to sign in</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

// send reset link
const sendResetEmail = async (userEmail, link) => {

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.HOST,
      pass: process.env.PWD,
    },
  });

  const mailOptions = {
    from: process.env.HOST,
    to: userEmail,
    subject: 'Reset password',
    html: `<p> Hi ${userEmail} <br>
          We received your request for reset credentials of your account <br>
          <a href="${link}">Click here to reset your account</a> </p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};



export { sendEMail, sendResetEmail };
