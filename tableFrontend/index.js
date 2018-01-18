const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3000
const favicon = require('serve-favicon')



//const validate = require('express-validation')
//const loginValidation = require("./src/Validation/Login")
// const registerValidation=require("./src/Validation/Register")

//router.post('/login', validate(loginValidation), (request, response) => {
//router.post('/register', validate(registerValidation), (request, response) => {



app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

