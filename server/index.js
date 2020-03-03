require('dotenv').config()
const express = require('express'),
  session = require('express-session'),
  massive = require('massive'),
  app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

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
    app.listen(SERVER_PORT || 4420, () => {
      console.log(`SERVER RUNNING ON PORT:${SERVER_PORT}`)
      console.log('db connected')
    })
  })
  .catch(err => console.log(`db not connected ${err}`))

// AUTH
// app.post('/api/auth/login') //POST body{username, password}
// app.post('/api//auth/register') //POST body{username, password}
// app.post('/api/auth/logout') //POST
// app.get('/api/auth/getUser') //GET *if user is save on session

// POSTS
// app./api/posts GET   *gets all user posts
// app./api/posts/:user_id  GET  *gets all posts from logged in user
// app./api/posts/:user_id/:post_id GET  * get selected post for the logged in user
// app./api/posts/:post_id PUT  body{title, content, price}  *edit selected posts title, content, price
// app./api/posts/:post_id DELETE *delete selected post

// CHAT
// app./api/chats/:user_id GET   *gets all Chat Rooms for the current user
// app./api/chats/:chat_id/:user_id GET  * get selected chat for the logged in user
// app./api/chats/:chat_id/:user_id POST body{text}  * posts a chat in the chat room
