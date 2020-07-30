const express = require('express')
const { Router } = require('express')
const route = express.Router()
const Controller = require('../controller/controller.js').Controller

route.get('/', Controller.home)
route.get('/register', Controller.addUserForm)
route.get('/qr', Controller.displayQR)
route.get('/success', Controller.displayConfirmation)

module.exports = route;