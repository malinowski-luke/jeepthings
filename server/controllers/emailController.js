const nodemailer = require('nodemailer'),
  { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
})
const options = { from: EMAIL_ADDRESS }

function emailHtml(args) {
  const { email, buyerEmail, msg, postTitle, img } = args
  return buyerEmail
    ? `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"> <head> <link href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css?family=Acme&display=swap" rel="stylesheet"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width"/> <style type="text/css"> /* original css */ *{margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;}img{max-width: 100%; max-height: 100%; margin: 0 auto; display: block; border: 6px solid #298aad; box-shadow: 2px 2px 10px #000000;}img.vertical-align{vertical-align: middle !important;}body, .body-wrap{width: 100% !important; height: 100%; background: #f5f5f5;}a{color: #ad4d29; text-decoration: none;}a:hover{text-decoration: underline;}.text-center{text-align: center;}.text-right{text-align: right;}.text-left{text-align: left;}h1, h2, h3, h4, h5, h6{margin-bottom: 20px; line-height: 1.25;}h1{font-size: 32px;}h2{font-size: 28px;}h3{font-size: 24px;}h4{font-size: 20px;}h5{font-size: 16px;}p, ul, ol{font-size: 16px; font-weight: normal; margin-bottom: 20px;}.container{display: block !important; clear: both !important; margin: 0 auto !important; max-width: 750px !important;}.container table{width: 100% !important; border-collapse: collapse;}.container .masthead{padding: 50px 0; background: #ad4d29; color: white;}.container .masthead h1{margin: 0 auto !important; max-width: 100%; font-size: 10vh; font-family: 'Dancing Script', cursive;}.container .content{background: white; padding: 10px 10px;}.container .content.body p{margin-bottom: 0; padding: 10px 10px 15px 15px; color: #298aad; text-align: left; font-size: 16px;}.container .content.body ul{margin-bottom: 15px; margin-top: 15px; padding-left: 35px; color: #298aad; text-align: left; font-size: 16px;}.container .content.body hr{margin-bottom: 20px;}.container .content.body table{margin-bottom: 25px; color: #298aad; text-align: center; vertical-align: middle;}/* original css */ /* responsive css */ @media screen and (max-width: 525px){h1{font-size: 50px !important;}}/* responsive css */ </style> </head> <body> <table class="body-wrap"> <tr> <td class="container"> <table> <tr> <td> <table> <tr> <td class="masthead text-center" width="100%"> <h1>jeepThings</h1> </td></tr></table> </td></tr><tr> <td class="content"> <table> <tr class="content body"> <td> <table> <tr> <td> <h4>You Have New Msg!</h4> <p style="text-align: center;">${buyerEmail}</p><hr/> </td></tr><tr> <td> <h4 style="text-transform:capitalize;">${postTitle}</h4> <img src="${img}" alt="${postTitle} img" width="65%"/> <p> ${msg}</p></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`
    : `<!DOCTYPE html> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <link href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css?family=Acme&display=swap" rel="stylesheet"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width"/> <style type="text/css"> /* original css */ *{margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;}img{max-width: 100%; max-height: 100%; margin: 0 auto; display: block; border: 6px solid #298aad; box-shadow: 2px 2px 10px #000000;}img.vertical-align{vertical-align: middle !important;}body, .body-wrap{width: 100% !important; height: 100%; background: #f5f5f5;}a{color: #ad4d29; text-decoration: none;}a:hover{text-decoration: underline;}.text-center{text-align: center;}.text-right{text-align: right;}.text-left{text-align: left;}h1, h2, h3, h4, h5, h6{margin-bottom: 20px; line-height: 1.25;}h1{font-size: 32px;}h2{font-size: 28px;}h3{font-size: 24px;}h4{font-size: 20px;}h5{font-size: 16px;}p, ul, ol{font-size: 16px; font-weight: normal; margin-bottom: 20px;}.container{display: block !important; clear: both !important; margin: 0 auto !important; max-width: 750px !important;}.container table{width: 100% !important; border-collapse: collapse;}.container .masthead{padding: 50px 0; background: #ad4d29; color: white;}.container .masthead h1{margin: 0 auto !important; max-width: 100%; font-size: 10vh; font-family: 'Dancing Script', cursive;}.container .content{background: white; padding: 10px 10px;}.container .content.body p{margin-bottom: 0; padding: 10px 10px 15px 15px; color: #298aad; text-align: left; font-size: 16px;}.container .content.body ul{margin-bottom: 15px; margin-top: 15px; padding-left: 35px; color: #298aad; text-align: left; font-size: 16px;}.container .content.body hr{margin-bottom: 20px;}.container .content.body table{margin-bottom: 25px; color: #298aad; text-align: center; vertical-align: middle;}/* original css */ /* responsive css */ @media screen and (max-width: 525px){h1{font-size: 50px !important;}}/* responsive css */ </style> </head> <body> <table class="body-wrap"> <tr> <td class="container"> <table> <tr> <td> <table> <tr> <td class="masthead text-center" width="100%"> <h1>jeepThings</h1> </td></tr></table> </td></tr><tr> <td class="content"> <table> <tr class="content body"> <td> <table> <tr> <td> <h4>Welcome!</h4> <p style='text-align: center;'>${email}</p><hr/> </td></tr><tr> <td> <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p><img src="https://jeepthings-img-bucket.s3.amazonaws.com/855f5f39-3d31-4226-a359-0409d6c71a4a-jeep.jpg" alt="email img" width="85%"/> <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`
}

module.exports = {
  sendWelcomeEmail: (email) => {
      emailOptions = { ...options }
    emailOptions['to'] = email
    emailOptions['subject'] = 'Welcome to jeepThings!'
    emailOptions['html'] = emailHtml({ email })
    transporter.sendMail(emailOptions, (err, info) => {
      if (!err) return res.sendStatus(200)
      else return res.sendStatus(500)
    })
  },
  // refer to this to make the front end work pay attention on whwat to pass in
  sendMsgToUser: (req, res) => {
    const { email, buyerEmail, msg, postTitle, img } = req.body,
      emailOptions = { ...options }
    emailOptions['to'] = email
    emailOptions['subject'] = 'You Have a Potenial Buyer!'
    emailOptions['html'] = emailHtml({ email, buyerEmail, msg, postTitle, img })
    transporter.sendMail(emailOptions, (err, info) => {
      if (!err) return res.sendStatus(200)
      else return res.sendStatus(500)
    })
  }
}
