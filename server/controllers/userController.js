const ApiError = require('../error/ApiError');
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, status) => {
    return jwt.sign(
        {id, email, status},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {

    async registration(req, res, next) {
        try {
            const {name, surname, email, password, birthDate, status} = req.body
            if (!email || !password) {
                return next(ApiError.custom('Incorrect email or password'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.custom('User with this email already exists'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({name, surname, email, birthDate, status, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.status, user.name, user.surname, user.birthDate)
            return res.json({token})
        } catch {
            return next(ApiError.internal())
        }


    }

    async login(req, res, next) {
        try{
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.custom('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.custom('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.status, user.name, user.surname, user.birthDate)
        return res.json({token})
        }catch {
            next(ApiError.internal())
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.status, req.user.name, req.user.surname, req.user.birthDate)
            return res.json({token})
        } catch {
            return next(ApiError.internal())
        }

    }
}

module.exports = new UserController()