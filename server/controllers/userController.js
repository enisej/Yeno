const ApiError = require("../error/ApiError");
const {User} = require('../models/models.js')

class UserController{

    async registration(req, res, next){
        try {
            const {name, surname, email, password, birthDate, status} = req.body
            await User.create({name, surname, email, password, birthDate, status})
            res.json({
                "message": "User Created"
            });
        } catch {
            return next(ApiError.internal())
        }

    }

    async login(req, res){

    }

    async check(req, res, next){

    }


}

module.exports = new UserController()