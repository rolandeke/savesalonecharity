const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.set("view engine", "ejs");

//GET: Index.html
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

//POST: COntact form from index.html
app.post("/contact", async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const info = await sendMail(username, email, message);
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log(info);
  } catch (error) {
    throw error;
  }
});
//This function is used to send mails from contact form
sendMail = async (email, username, message) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // user's email
        pass: process.env.PASSWORD // user's password
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email, // sender address
      to: "rolandeke49@gmail.com", // list of receivers
      subject: `New Message From Contact Form by -  ${username}`, // Subject line
      text: message
    });

    return info;
  } catch (error) {
    throw error;
  }
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
