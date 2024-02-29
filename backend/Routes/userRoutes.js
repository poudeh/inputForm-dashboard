const express = require('express');
const inputFormDB = require('../db/inputFormDB');
const userRoutes = express.Router();
module.exports = userRoutes;

userRoutes.post('/new-user', (req, res) => {
    console.log('connected to inputFormDB successfully');
    let body = req.body
    let date = new Date().toLocaleDateString("fa-IR");
    let insertUserQuery = `INSERT INTO users VALUES ('NULL','${body.firstname}','${body.lastname}','${body.username}','${body.password}','${body.email}','${date}')`
    inputFormDB.query(insertUserQuery, (error, result) => {
        if (error) {
            console.log('Insert user failed');
            res.send(null)
        } else {
            console.log('one user added');
            res.send(true)
        }

    })

})


userRoutes.get('/all', (req, res) => {
    console.log('connected to inputFormDB successfully');
    let getAllUsers = 'SELECT * FROM users'
    inputFormDB.query(getAllUsers , (error , result)=> {
        if (error) {
            console.log('Insert user failed');
            res.send(null)
        } else {
            console.log('one user added');
            res.send(JSON.stringify(result))
        }
    })

})

userRoutes.delete('/delete/:userID' , (req , res)=> {
    const userID = req.params.userID
    let deleteUserQuery = `DELETE FROM users WHERE id = ${userID}`
    inputFormDB.query(deleteUserQuery , (error , result)=> {
        if (error) {
            console.log('Delete user failed');
            res.send(null)
        } else {
            console.log('user deleted successfully');
            res.send(true)
        }
    })



})

userRoutes.put('/edit/:userID' , (req , res)=> {
    const userID = req.params.userID;
    let body = req.body
    let updateUserQuery = `UPDATE users SET firstname='${body.firstname}',lastname='${body.lastname}',username='${body.username}',email='${body.email}' WHERE id = ${userID}`
    inputFormDB.query(updateUserQuery , (error , result)=> {
        if (error) {
            console.log('edit user failed');
            res.send(null)
        } else {
            console.log('user edited successfully');
            res.send(true)
        }

    })
})

