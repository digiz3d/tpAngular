const config = require('./config');
const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport(config.mailConfig);

function send(to, subject, message) {
    let email = {
        from: config.mailConfig.auth.user,
        to: to,
        subject: subject,
        text: message
      };
      console.log("################ bravo");
    transporter.sendMail(email);
}


module.exports = {
    send : send
}