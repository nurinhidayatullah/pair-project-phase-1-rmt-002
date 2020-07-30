const { Booking, Hotel, User, i } = require('../models')
const convert = require('../helper/convertToMoney')
const QRCode = require('qrcode');


class Controller {
    static home (req, res) {
        let { id } = req.query
        Hotel.findAll({
            include: {model: i}
            })
            .then((datas) => {
                for(let data of datas) {
                    data.price = convert(data.price)
                }
                if(id) {
                    res.render('home', {datas, id})
                } else {
                    res.render('home', {datas, id: null})
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static addUserForm (req, res) {
        res.render('addUserForm', {id: null})
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
        let id = req.params.id
        res.render('addHotelForm', {id: Number(id)})
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

    static login(req, res) {
        let {username, password} = req.body
        let login;
        User.findOne({where: {username, password}})
            .then(data => {
                let { status } = data
                let obj = {status: true}
                login = data
                return User.update(obj,{where: {id: data.id}, field: {status}})
            })
            .then(data => {
                res.redirect(`/?id=${login.id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        let id  = req.params.id
        id = Number(id)
        let obj = {status: false}
        User.update(obj, {where: {id}, field: {status: false}})
            .then(data => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static myPage (req, res) {
        let id = req.params.id
        id = Number(id)
        let isCustomer;
        User.findByPk(id, {
            include: {model: Hotel}
        })
            .then(data => {
                console.log(data)
                if(user.type === 'customer'){
                    isCustomer = true
                } else {
                    isCustomer = false
                }
                res.render('my-page', {data, isCustomer})                 
            })
            .catch(err => {
                res.send(err)
            }) 
    }

    static booking(req, res) {
        let id = req.params.id
        let { checkin, checkout, HotelId } = req.body
        let obj = {UserId: id, HotelId: Number(HotelId), checkin_date: checkin, checkout_date: checkout}
        Booking.create(obj)
            .then(data => {
                res.redirect(`/myPage/${id}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = {Controller}