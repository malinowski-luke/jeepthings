const nodemailer = require('nodemailer'),
  { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
})

module.exports = {
  sendEmail: (req, res) => {
    const { email } = req.body
    const options = {
      from: EMAIL_ADDRESS,
      to: email,
      subject: 'test',
      text: 'test body'
    }
    transporter.sendMail(options, (err, info) => {
      if (!err) console.log(`sent email to ${email.com}`)
      else 'failed to send email', err
    })
  }
}
