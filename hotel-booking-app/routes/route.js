const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')

route.get('/', Controller.home)
route.get('/register', Controller.addUserForm)

module.exports= route;