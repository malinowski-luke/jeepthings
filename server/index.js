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

// endpoints
