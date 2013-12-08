// Copy in your particulars and rename this to mail.js
module.exports = {
  service: "SendGrid",
  host: "smtp.sendgrid.net",
  port: 587,
  secureConnection: false,
  //name: "servername",
  auth: {
    user: "agarwalswapy",
    pass: "swapydapy@123"
  },
  ignoreTLS: false,
  debug: false,
  maxConnections: 5 // Default is 5
}
