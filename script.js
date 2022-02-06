const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

app.post("/", async (req, res) => {
  try {
    const options = {
      email: req.body.email,
      subject: req.body.subject,
      text: req.body.description,
    };

    console.log(options);

    await sendEmail(options);

    console.log(req.body);

    res.json({
      message: "email send successfully",
    });
  } catch (e) {
    res.json({
      message: "Error sending email, please try again later",
    });
  }
});

app.listen(4000, () => {
  console.log(`server runing on port http://localhost:4000`);
});

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",

    auth: {
      user: "aashish.upadhyay98651@gmail.com",
      pass: "Newnepal#12345",
    },
  });

  const mailOptions = {
    from: "Tocord <aashish.upadhyay98651@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("mail send successfully");
  } catch (e) {
    console.log(e.message);
  }
};
