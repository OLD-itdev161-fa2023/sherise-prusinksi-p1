const connectDatabase = require("./config/db") //database server
const express = require("express") // express application server
const app = express() // generate an app object

connectDatabase(); //Connect to mongoDB database

const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 8081 // port that the server is running on => localhost:8081
app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload

app.listen(PORT, () => {
    // listening on port 3000
    console.log(`listening on port ${PORT}`) // print this when the server starts
})