const nodemailer = require("nodemailer");
const emailer = function emailer(to, text) {
  //function to send email
  const nodemailer = require("nodemailer");
async function main() {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
        auth: {
          user: process.env.CSV_EMAIL,
          pass: process.env.CSV_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL_TO, 
    to: to, 
    subject: "Hello ✔", 
    text: "Your OTP is"+text 
  });
  console.log("sent");
}

main().catch(console.error);}
module.exports = emailer;