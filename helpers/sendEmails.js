const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env; 

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmails = async (data) => {
    const email = {
      to: data.email,
      from: "volosgoto@yahoo.com",
      subject: "verification for your registration",
      html: `<div><p>please verify your mail:</p><a href='http://localhost3000/api/users/verify/${data.verificationToken}'></a></div>`,
    };
    await sgMail.send(email);
    return true;
}

module.exports = sendEmails;