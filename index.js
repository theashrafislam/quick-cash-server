const express = require('express')
const app = express()
const port = process.env.POST || 5000;
const cors = require('cors');
require('dotenv').config()

//middelware
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello, I am Quick Cash Server. Right Now I am all OKAY!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})