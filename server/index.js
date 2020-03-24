require('dotenv').config()
const express = require('express'),
  session = require('express-session'),
  massive = require('massive'),
  app = express(),
  authCtrl = require('./controllers/authController'),
  userCtrl = require('./controllers/userController'),
  postCtrl = require('./controllers/postController'),
  emailCtrl = require('./controllers/emailController'),
  s3Ctrl = require('./controllers/s3Controller'),
  path = require('path'),
  { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env


app.use(express.static(`${__dirname}/../build` )) // runs front end for hosting 
app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(db => {
    app.set('db', db)
    app.listen(PORT || 4420, () => {
      console.log(`SERVER RUNNING ON PORT:${PORT}`)
      console.log('db connected')
    })
  })
  .catch(err => console.log(`db not connected ${err}`))


if(process.env.NODE_ENV==='production'){
  app.use(express.static('build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
  })
}


// --------------AUTH-----------------
app.post('/api/auth/login', authCtrl.login)
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/get_user', authCtrl.getUser)

// ----------UPDATE-USER_INFO---------
app.post('/api/user/change_profile_pic', userCtrl.updateProfileImg)

// --------------POSTS----------------
app.get('/api/posts', postCtrl.getAllUserPosts)
app.get('/api/posts/:post_id', postCtrl.getCurrentPost)
app.post('/api/posts/:user_id', postCtrl.addPost)
app.put('/api/posts/:post_id', postCtrl.editPost)
app.delete('/api/posts/:post_id', postCtrl.deletePost)

// --------------AWS-S3----------------
app.get('/api/sign-s3', s3Ctrl.signInS3)

// --------------EMAIL-----------------
// app.post('/api/email/msg', emailCtrl.sendMsgToUser)
app.post('/api/email/welcome', emailCtrl.sendWelcomeEmail)
