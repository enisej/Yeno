const ApiError = require('../error/ApiError');
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {hash} = require("bcrypt");
const uuid = require('uuid')
const path = require('path')

// funkcija pieņem lietotāja datus un generē šifrētu tokenu , no iegūtiem datiem.
const generateJwt = (id, email, status, name, surname, birthDate, tel_number, cv, githubLink) => {
    return jwt.sign(
        {id, email, status, name, surname, birthDate, tel_number, cv, githubLink},
        //paslēpta šifra atslēga
        process.env.SECRET_KEY,
        //tokena opcijas valīds tikai 24 stundas
        {expiresIn: '24h'}
    )
}

// klasse
class UserController {

    //reģistrācijas funkcija

    async registration(req, res, next) {
        try {
            //pieņiem lietotāja ievadītos datus reģistrācija laikā
            const {name, surname, email, password, birthDate, status, tel_number, cv, githubLink} = req.body

            // parbauda vai dati ir ievadīti
            if (!email || !password || !name || !surname || !birthDate || !tel_number || !cv || !githubLink ) {
                return next(ApiError.custom('Nepareizi ievadīti dati!'))
            }

            // parbauda vai lietotājs ar norādīto epasti eksiste
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.custom('Lietotājs ar šo e-pastu jau eksistē!'))
            }
            // ja parbaudes izietas veiksmigi tad bibliotēka bcrypt šifrē paroli pirms saglabāt datu bāze
            const hashPassword = await bcrypt.hash(password, 5)

            // pieprasijums datu bāzei , kurs izveidos jaunu ierakstu lietotāju tabulā
            const user = await User.create({name, surname, email, birthDate, status, tel_number, githubLink, cv, password: hashPassword})
            //atdodam visus iesnegtus datus augšā aprakstītai funkcijai , kura veido tokenu
            const token = generateJwt(user.id, user.email, user.status, user.name, user.surname, user.birthDate ,user.tel_number, user.cv, user.githubLink)
            //atgriežam tokenu
            return res.json({token})
        } catch {
            //atgriežam kļudu , jā dati kaut kāda iemesla deļ nebija iesniegti
            return next(ApiError.internal())
        }


    }

    //funkcijas rediģe lietotaja profila bildi
    async updateUserImage(req, res, next){
        try{
            //pieprasam ievadīt mainīgo img , kā failu
            const {img} = req.files
            //veidojam unikālo faila nosaukumu mūsu bildei
            let fileName = uuid.v4() + ".jpg"
            // atdodam failu mapē static , lai serveris to varēto nošeirot.
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            // pievienojam bildes nosaukumu datu bāzei , lai turpmāk to varētu iegūt
            await User.update({img: fileName}, {
                where:{
                    //rediģēja bildi tām lietotājam kurā id lauks ir norādīts parametros
                    id: req.params.id
                }
            });
            // atgriežam , ja attēls ir veiksmigi nomainīts
            res.json({
                "message": "Attēls ir nomainīts!"
            });
        }catch {
            // atgriežam kļūdu , jā nesanāca nomainīt attēlu.
            return next(ApiError.internal())
        }

    }
//funkcija login
    async login(req, res, next) {
        try{
            //pieprasam ievadīt e-pastu un paroli
        const {email, password} = req.body
            //meklē vai lietotājs ar šo e-pastu esksitē
        const user = await User.findOne({where: {email}})
            //jā lietotajs ar šo e-pastu neeksiste tad atgrizām kludu
        if (!user) {
            return next(ApiError.custom('Lietotājs ar šo e-pastu neēksistē!'))
        }
        //salidzinam ievadīto paroli un paroli no datu bāzes ar bcrypt dešifrēšanas funckiju.
        let comparePassword = bcrypt.compareSync(password, user.password)
            // ja paroles nav vienādas tad atgriežas kluda
        if (!comparePassword) {
            return next(ApiError.custom('Nepareizi ievadīta parole!'))
        }
        // jā viss ir kartība , tad generējam un atgriežam lietotajam tokenu
        const token = generateJwt(user.id, user.email, user.status, user.name, user.surname, user.birthDate, user.tel_number, user.cv, user.githubLink)
        return res.json({token})
        }catch {
            // ja notiek kluda ielogojoties atgriežam kludas pazinojumu
            next(ApiError.internal())
        }
    }

    //funckija nem lietotāja datus un parbauda vai viņš ir ielogots, ja lietotāju datu nav tad funkcjia atgriež kļudu.
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

            const {name, surname, email, birthDate, tel_number, cv, githubLink} = req.body

            await User.update({name, surname, email, birthDate, tel_number, cv, githubLink}, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Lietotāja dati ir izmainīti! Pēc lapas refresha jūs atgriezīsies pie pieslēgšanas formas!"
            });
        }catch {
            return next(ApiError.internal())
        }

    }

    async updateUserPassword(req, res, next){
        try{
            const {password} = req.body
            const hashPassword = await bcrypt.hash(password, 5)
            await User.update({password: hashPassword}, {
                where:{
                    id: req.params.id
                }
            });
            res.json({
                "message": "Parole ir nomainīta!"
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
                "message": "Lietotājs ir izdzēsts!"
            });
        } catch {
            return next(ApiError.internal())
        }

    }

    async getAll(req, res, next){
        try {
            const data = await User.findAll()
            return res.json(data)
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