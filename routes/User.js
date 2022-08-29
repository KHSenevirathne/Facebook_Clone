const express = require('express')
const app = express()
const router = express.Router()
const User = require('../models/user.models')

app.use(express.json())

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.firstName = req.body.firstName
        user.surname = req.body.surname
        user.gender = req.body.gender
        user.dateOfBirth = req.body.dateOfBirth
        user.password = req.body.password
        user.phoneNumber = req.body.phoneNumber
        user.email = req.body.email

        const response = await user.save()

        res.json(response)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        surname: req.body.surname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    })

    try {
        const response = await user.save()
        res.json(response)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.delete('/', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.query.id)
        res.json(user)
    } catch (e) {
        res.send("Err : " + e)
    }
})



router.get('/:email/:password', async (req, res) => {
    try {
        const user = await User.findOne({email:req.params.email,password:req.params.password})
        if (user){
            res.json({"Message" : "Login Successful"})
        } else {
            res.json({"Message" : "Login unsuccessful.Try again later"})
        }
    } catch (e) {
        console.log("Err : " + e)
    }
})


module.exports = router