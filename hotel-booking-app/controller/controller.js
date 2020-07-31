const { Booking, Hotel, User, i } = require('../models')
const {Op, where} = require('sequelize')
const convert = require('../helper/convertToMoney')
const QRCode = require('qrcode');


class Controller {
    static home (req, res) {
        let { id } = req.query
        let datas;
        Hotel.findAll({
            include: {model: i}
            })
            .then((hotel) => {
                datas = hotel
                return User.findByPk(id)
            })
            .then(user => {
                for(let data of datas) {
                    data.price = convert(data.price)
                }
                if(id) {
                    res.render('home', {datas, id, user})
                } else {
                    res.render('home', {datas, id: null, user: {type: null}})
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static addUserForm (req, res) {
        res.render('addUserForm', {id: null, user: {type: null}})
    }

    static addUser (req, res) {
        let { name, username, password, type } = req.body
        let obj = { name, username, password, type, status: false}
        User.create(obj)
            .then((data) => {
                res.redirect('/')
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
        let { name, location, roomsavailable, price, ImageId } = req.body
        let obj = { name, location, roomsavailable: Number(roomsavailable), price: Number(price), IId: Number(ImageId) }

        Hotel.create(obj)
            .then((data) => {
                res.redirect('/')
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
        let id = req.params.id
        let { name, location, roomsavailable, price, IId } = req.body
        let obj = { name, location, roomsavailable: Number(roomsavailable), price: Number(price), IId: Number(IId) }
        Hotel.update(obj, {where: {id}})
            .then((data) => {
                res.redirect('/?id=2')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static displayQR (req, res) {
        let id = req.params.id
        QRCode.toDataURL('/success', function (err, url) {
            res.render(`qr`, {qr: url, id});
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

    static booking(req, res) {
        let id = req.params.id
        let { checkin, checkout, HotelId } = req.body
        let obj = {UserId: Number(id), HotelId: Number(HotelId), checkin_date: checkin, checkout_date: checkout}
        Booking.create(obj)
            .then(datas => {
                return Hotel.findByPk(HotelId)
            })
            .then(data => {
                let {roomsavailable} = data
                roomsavailable -= 1
                let obj = {roomsavailable}
                return Hotel.update(obj,{where:{id: HotelId}, field:{roomsavailable}})
            })
            .then(data => {
                res.redirect(`/qr/${id}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static showHotel(req, res) {
        Hotel.findAll()
            .then(datas => {
                res.render('edit-home', {datas})
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = {Controller}