const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller.js').Controller

route.get('/', Controller.home)
route.get('/register', Controller.addUserForm)
route.post('/register', Controller.addUser)
route.post('/', Controller.login)
route.post('/logout/:id', Controller.logout)
route.get('/hotels/add', Controller.addHotelForm)
route.post('/hotels/add', Controller.addHotel)
route.get('/hotels', Controller.showHotel)
route.get('/hotels/edit/:id', Controller.editHotelForm)
route.get('/hotels/delete/:id', Controller.deleteHotel)
route.post('/hotels/edit/:id', Controller.editHotel)
route.post('/booking/:id', Controller.booking)
route.get('/qr/:id', Controller.displayQR)
route.get('/success/:id', Controller.displayConfirmation)

module.exports = route;