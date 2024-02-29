const mysql = require('mysql')
const inputFormDB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'input_form'
})

module.exports = inputFormDB