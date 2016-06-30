var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // verifie que 2 utilisateurs pas le meme nom
    },
    password: String,
    isAdmin: {
        type: Boolean, 
        default: false // par defaut non admin
    }
});

var User = {
    model: mongoose.model('User', userSchema), // variable, model que appelle av user. model, ds classe mongoose cree noveau model user av shema usershema

connect: function(req, res) {
    User.model.findOne(req.body, { // trouver premiere occurence, find = findall
        password: 0 // pas de password à renvoyer pr pas intercepter, filtre
    }, function(err, user) {
        if (err || !user) // si err ou diif user status 403
            res.sendStatus(403);
        else {
            var token = jwt.sign(user, 'tokenSecret', { // creer token encoder, 
                expiresIn: '10h'//expires in 24 hours
            });

            // return the information including token as JSON
            res.json({ // renvoie reponse json
                success: true,
                user: user, // que nom pas password
                token: token
            });
        }
    });
},

findAll: function(req, res) {
    User.model.find({}, {
        password: 0
    }, function(err, users) {
        res.json(users);
    });
},

findById: function(req, res) {
    User.model.findById(req.params.id, {
        password: 0
    }, function(err, user) {
        res.json(user);
    });
},

create: function(req, res) {
    User.model.create(req.body,
        function(err, user) {
            if (!err)
                res.json(user);
            else {
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Username " + req.body.name + " already exist";

                res.status(500).send(err.message);
            }
        });
},

update: function(req, res) {
    User.model.update({
        _id: req.params.id
    }, req.body, function(err, user) {
        console.log(user);
        if (err)
            res.status(500).send(err.message);
        res.json(user);
    });
},

delete: function(req, res) {
    User.model.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.status(500).send(err.message);
        res.sendStatus(200);
    })
}

}

module.exports = User;