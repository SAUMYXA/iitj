const router = require("express").Router();
const { parse } = require("csv-parse");
const nodemailer = require("nodemailer");
//kharepushkar2804@gmail.com
const fs = require("fs");
const email = 2;
const Companyname = 0;
const name = 1;
router.get("/detail", (req, res) => {
  try {
    const parser = parse({ columns: false }, (err, records) => {
      for (var i = 0; i < 15; i++) {
        let record = [];
        record = records[i];
        // console.log(record[2]);
        async function main() {
          let testAccount = await nodemailer.createTestAccount();
          const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
              user: process.env.CSV_EMAIL,
              pass: process.env.CSV_PASSWORD,
            },
          });
          let info = await transporter.sendMail({
            from: `${req.body.email}`,
            to: record[2],
            subject: `${req.body.currentPosition} seeking ${req.body.position} at ${record[0]}`,
            text: `Dear ${record[1]}`,
            html: `<pre>My name is <b>${req.name}</b> and got to know about your company <span style="color:red">Growth</span>, I understand that you actively recruit ${req.body.position} for ${record[0]}.
            I’ve been working as a <b>${req.body.currentPosition||"Fresher"}</b> with ${req.body.currentEmployer||""} for "${req.body.tenure||""} and in that time I’ve ${req.body.value||""}.
            If you have any opportunities available for ${req.body.position} then I would greatly appreciate to <b>meet and talk</b> further about how we may work together.
            Please take your time to review my <b>attached resume</b>. I believe that I would be an excellent candidate for the available position, and I’m waiting for the opportunity to meet you in person and discuss how my skills and experience can benefit ${record[0]}.
            Thank you for the opportunity.            
            Yours sincerely,
            
            (Your sign-off)</pre>,`,
            attachments:
              {
                  filename: `${req.files}`,
                  content: `pdf attached`,
                  contentType: 'text/plain' 
              },
          });
        }
        console.log("sent");
        main().catch(console.error);
      }
    });

    fs.createReadStream(__dirname + "/recruiter.csv").pipe(parser);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;