const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    name: {type: DataTypes.STRING, allowNull: false },
    surname: {type: DataTypes.STRING, allowNull: false },
    email: {type: DataTypes.STRING, allowNull: false },
    tel_number: {type: DataTypes.STRING, allowNull: false },
    password: {type: DataTypes.STRING, allowNull: false},
    birthDate: {type: DataTypes.DATE, allowNull: false},
    cv: {type: DataTypes.STRING, allowNull: false},
    githubLink: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, defaultValue: 'USER'},
    img: {type: DataTypes.STRING, allowNull: true}
}, {
    timestamps: false
})

const Vacancy = sequelize.define('vacancies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    description: {type: DataTypes.TEXT, allowNull: false },
    qualifications: {type: DataTypes.TEXT, allowNull: false },
    offer: {type: DataTypes.TEXT, allowNull: false },
    status: {type: DataTypes.BOOLEAN, defaultValue: true},
    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},
    updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()}
})

const PracticeExercise = sequelize.define('practiceExercises', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    link: {type: DataTypes.STRING, allowNull: false, unique: true },
    description: {type: DataTypes.TEXT, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},
    updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()}
})

const TheoryTest = sequelize.define('theoryTests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    link: {type: DataTypes.STRING, allowNull: false, unique: true },
    description: {type: DataTypes.TEXT, allowNull: false},
    responseLink: {type: DataTypes.STRING, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},
    updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},
})

const PracticeResult = sequelize.define('practiceResults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    responseLink: {type: DataTypes.STRING, allowNull: false},
    responseDescription: {type: DataTypes.TEXT, allowNull: true},
    RecievedPoints: {type: DataTypes.INTEGER, allowNull: true },
    Feedback: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},
    updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},

})

const RequestedVacancies = sequelize.define('requestedVacancies',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
})

PracticeExercise.hasOne(Vacancy)
Vacancy.belongsTo(PracticeExercise)

TheoryTest.hasOne(Vacancy)
Vacancy.belongsTo(TheoryTest)

PracticeExercise.hasMany(PracticeResult)
PracticeResult.belongsTo(PracticeExercise)


User.hasMany(PracticeResult)
PracticeResult.belongsTo(User)

Vacancy.hasMany(RequestedVacancies , { onDelete: 'cascade' })
RequestedVacancies.belongsTo(Vacancy)

User.hasMany(RequestedVacancies)
RequestedVacancies.belongsTo(User)

RequestedVacancies.hasOne(PracticeResult, {onDelete: 'cascade'})
PracticeResult.belongsTo(RequestedVacancies)

module.exports = {
        User,
        Vacancy,
        TheoryTest,
        PracticeExercise,
        PracticeResult,
        RequestedVacancies,
}