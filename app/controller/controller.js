const db = require('../config/db.config.js');
const config = require('../config/config.js');
const path = require('path');
const User = db.user;
const Role = db.role;
const Admin = db.admin;


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.signup = (req, res) => {
    // Veritabanına kullanıcı kaydı
    console.log("Kayıt işlemi yapılıyor");
    console.log(req.body.roles);
    User.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        Role.findAll({
            where: {
                name: req.body.roles
            }
        }).then(roles => {
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            user.setRoles(roles).then(() => {
                res.send({ status: true, accessToken: token });
            });
        }).catch(err => {
            console.log("object");
            res.status(500).send("Error -> " + err);
        });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}


exports.signin = (req, res) => {
    console.log("Giriş Yapılıyor...");

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        // console.log(user);
        if (!user) {
           return res.status(400).send('Kullanıcı bulunamadı.');
            //console.log('kullanıcı bulunamadı');
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ status: false, accessToken: null, reason: "Invalid Password!" });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 
        });
       // res.sendFile(path.join(__dirname+'/view/message_box.html'));
        res.status(200).send({ status: true, accessToken: token });
    }).catch(err => {
        console.log(err);
    });
}


exports.userContent = (req, res) => {
    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'surname', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Kullanıcı Sayfasına Hoş Geldiniz",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Kullanıcı sayfasına erişiminiz yoktur.",
            "error": err
        });
    })
}

//kulannıcı listeleme fonksiyonu
exports.userList = (req, res) => {
	User.findAll()
		.then(user =>
			res.json(user)
		)
}

// kullanıcı görüntüleme fonksiyonu
exports.userView = function (req, res) {
	users.findOne({
		where: { id: req.params.id }
	}).then(user =>
		res.json(user)
	)
}
