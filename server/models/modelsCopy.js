const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    name: {type: DataTypes.STRING(20), allowNull: false },
    surname: {type: DataTypes.STRING(20), allowNull: false },
    email: {type: DataTypes.STRING(60), allowNull: false },
    tel_number: {type: DataTypes.STRING(20), allowNull: false },
    password: {type: DataTypes.STRING(16), allowNull: false},
    birthDate: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.STRING(5), defaultValue: 'USER'}
}, {
    timestamps: false
})

const Vacancy = sequelize.define('vacancies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING(20), allowNull: false },
    description: {type: DataTypes.TEXT, allowNull: false },
    qualifications: {type: DataTypes.TEXT, allowNull: false },
    offer: {type: DataTypes.TEXT, allowNull: false },
    status: {type: DataTypes.BOOLEAN, defaultValue: true},
    createdAt: {type: DataTypes.DATE, allowNull: false, default: Date.now()},
    updatedAt: {type: DataTypes.DATE, allowNull: false, default: Date.now()}
})

const PracticeExercise = sequelize.define('practiceExercises', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING(20), allowNull: false },
    link: {type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: {type: DataTypes.TEXT, allowNull: false},
    activeFrom: {type: DataTypes.DATE, allowNull: false, default: Date.now()},
    activeTo: {type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false
})

const TheoryTest = sequelize.define('theoryTests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING(20), allowNull: false },
    link: {type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: {type: DataTypes.TEXT, allowNull: false},
    activeFrom: {type: DataTypes.DATE, allowNull: false, default: Date.now()},
    activeTo: {type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false
})

const TheoryTestResult = sequelize.define('theoryTestResults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    response_link: {type: DataTypes.STRING(100), allowNull: false},
}, {
    timestamps: false
})

const PracticeResult = sequelize.define('practiceResults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    response_link: {type: DataTypes.STRING(100), allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    RecievedPoint: {type: DataTypes.INTEGER(3), allowNull: true }

}, {
    timestamps: false
})


PracticeExercise.hasOne(Vacancy)
Vacancy.belongsTo(PracticeExercise)

TheoryTest.hasOne(Vacancy)
Vacancy.belongsTo(TheoryTest)


PracticeExercise.hasMany(PracticeResult)
PracticeResult.belongsTo(PracticeExercise)

User.hasMany(PracticeResult)
PracticeResult.belongsTo(User)

TheoryTest.hasMany(TheoryTestResult)
TheoryTestResult.belongsTo(TheoryTest)

module.exports = {
        User,
        Vacancy,
        TheoryTest,
        TheoryTestResult,
        PracticeExercise,
        PracticeResult
}