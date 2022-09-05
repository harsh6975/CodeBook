const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "CodeBooks",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "harshu1234ashv@gmail.com",
      pass: "SinhaHarsh@123",
    },
  },
  google_client_id:
    "957973625302-es3plcqh2rvde41nd55bcvhcv9k60dj5.apps.googleusercontent.com",
  google_callback: "http://localhost:3000/users/auth/google/callback",
  jwt_secret: "CodeBooks",
};

module.exports = development;
