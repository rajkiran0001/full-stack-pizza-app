require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const mysql = require('mysql')

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_name
})

connection.connect(err => {
  if(err) {
    return err;
  }
})
console.log(connection);

app.get('/', (req, res) => {
  res.send('go to the home pagenode')
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
