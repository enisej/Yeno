const ApiError = require('../error/ApiError');
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, status, name, surname, birthDate, tel_number, cv, githubLink) => {
    return jwt.sign(
        {id, email, status, name, surname, birthDate, tel_number, cv, githubLink},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
        try {
            const {name, surname, email, password, birthDate, status, tel_number, cv, githubLink} = req.body
            if (!email || !password || !name || !surname || !birthDate || !tel_number || !cv || !githubLink ) {
                return next(ApiError.custom('Incorrect data'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.custom('User with this email already exists'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({name, surname, email, birthDate, status, tel_number, githubLink, cv, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.status, user.name, user.surname, user.birthDate ,user.tel_number, user.cv, user.githubLink)
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
        const token = generateJwt(user.id, user.email, user.status, user.name, user.surname, user.birthDate, user.tel_number, user.cv, user.githubLink)
        return res.json({token})
        }catch {
            next(ApiError.internal())
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.status, req.user.name, req.user.surname, req.user.birthDate, req.user.tel_number, req.user.cv, req.user.githubLink)
            return res.json({token})
        } catch {
            return next(ApiError.internal())
        }

    }

    async update(req, res, next) {
        try {

            const {name, surname, email, password, birthDate, status, tel_number, cv, githubLink} = req.body
            if (!email || !password || !name || !surname || !birthDate || !status || !tel_number || !cv || !githubLink) {
                return next(ApiError.custom('Empty fields!'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            await User.update({name, surname, email, password: hashPassword, birthDate, status, tel_number, cv, githubLink}, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "User data updated"
            });
        }catch {
            return next(ApiError.internal())
        }

    }

    async delete(req, res, next) {
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.json({
                "message": "User deleted"
            });
        } catch {
            return next(ApiError.internal())
        }

    }

    async getAll(req, res, next){
        try {
            const vacancies = await User.findAll()
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }

    async getById(req, res, next){
        try {
            const data = await User.findAll({
                where: {
                    id: req.params.id
                }

            });

            if (data.length === 0)
            {
                return next(ApiError.badRequest())
            }else
            {
                res.json(data[0]);
            }

        } catch {

            return ApiError.internal()
        }
    }

}

module.exports = new UserController()