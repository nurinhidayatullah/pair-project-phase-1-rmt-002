const express = require('express')
const { Router } = require('express')
const route = express.Router()
const Controller = require('../controller/controller.js').Controller

route.get('/', Controller.home)
route.get('/register', Controller.addUserForm)
route.post('/', Controller.login)
route.post('/logout/:id', Controller.logout)
route.get('/myPage/:id', Controller.myPage)
route.get('/:id/addHotel', Controller.addHotelForm)
route.get('/qr', Controller.displayQR)
route.get('/success', Controller.displayConfirmation)

module.exports = route;