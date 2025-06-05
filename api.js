const express = require("express")
const app = express.Router()
const {
    fetchUsers,
    fetchPlaces,
    fetchVacations,
    createVacation,
    deleteVacation,
} = require('./db.js')

// CREATE
app.post('/vacations' , async(req,res,next) => {
    try {
        res.send(await createVacation(req.body))
    } catch (error) {
        next(error)
    }
})

// READ
app.get('/users' , async (req,res,next) => {
    try {
        res.send(await fetchUsers())
    } catch (error) {
        next(error)
    }
})

app.get('/places' , async (req,res,next) => {
    try {
        res.send(await fetchPlaces())
    } catch (error) {
        next(error)
    }
})

app.get('/vacations' , async (req,res,next) => {
    try {
        res.send(await fetchVacations())
    } catch (error) {
        next(error)
    }
})

// UPDATE
// DELETE
app.delete('/vacations/:id' , async (req,res,next) => {
    try {
        res.send(await deleteVacation(req.params.id))
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = app