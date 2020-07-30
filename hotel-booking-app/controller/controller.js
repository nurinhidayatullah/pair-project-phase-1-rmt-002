const { Booking, Hotel, User, i } = require('../models')
const convert = require('../helper/convertToMoney')
const QRCode = require('qrcode');

class Controller {
    static home (req, res) {
        Hotel.findAll({
            include: {model: i }
            })
            .then((datas) => {
                for(let data of datas) {
                    data.price = convert(data.price)
                }
                res.render('home', {datas})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static addUserForm (req, res) {
        res.render('addUserForm')
    }

    static addUser (req, res) {
        let { username, password, type, status } = req.body
        let obj = { username, password, type, status }
        User.create(obj)
            .then((data) => {
                res.redirect('home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static addHotelForm (req, res) {
        res.render('addHotelForm')
    }

    static addHotel (req, res) {
        let { name, location, roomsavailable, price } = req.body
        let obj = { name, location, roomsavailable, price }
        Hotel.create()
            .then((data) => {
                res.redirect('home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static deleteHotel (req, res) {
        Hotel.destroy()
            .then((data => {
                res.redirect('home')
            }))
            .catch((err) => {
                console.log(err)
            })
    }

    static editHotelForm (req, res) {
        Hotel.findByPk(req.params.id)
            .then((data) => {
                res.render('editHotelForm', { data })
            })
            .catch((err) => {
                console.log9err
            })
    }

    static editHotel (req, res) {
        let { name, location, price } = req.body
        let obj = { name, location, price }
        Hotel.update({
                name: obj.name,
                location: obj.location,
                price: obj.price
            })
            .then((data) => {
                res.redirect('home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static displayQR (req, res) {
        QRCode.toDataURL('/success', function (err, url) {
            res.render('qr', {qr: url});
        })
    }

    static displayConfirmation (req, res) {
        res.render('success')
    }
}

module.exports = {Controller}