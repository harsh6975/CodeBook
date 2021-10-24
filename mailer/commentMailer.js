const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  //   console.log("mailer working",comment);
  let html = nodemailer.renderTemplate(
    { comment: comment },
    "/commentMailer.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "harshu1234ashv@gmail.com",
      to: comment.user.email,
      subject: "Hey boy u just commented",
      html: html,
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message send ", info);
      return;
    }
  );
};
