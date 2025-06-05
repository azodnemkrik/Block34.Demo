const express = require("express")
const app = express.Router()
const {
    fetchUsers
} = require('./db.js')

app.get('/users' , async (req,res,next) => {
    try {
        res.send(await fetchUsers())
    } catch (error) {
        next(error)
    }
})

module.exports = app