const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "harshu1234ashv@gmail.com",
    pass: "SinhaHarsh@123",
  },
});

let renderTemplate = function (data, relativePath) {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname , "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  renderTemplate: renderTemplate,
  transporter: transporter,
};
