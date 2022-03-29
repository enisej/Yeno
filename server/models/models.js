const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    name: {type: DataTypes.STRING, allowNull: false },
    surname: {type: DataTypes.STRING, allowNull: false },
    email: {type: DataTypes.STRING, allowNull: false },
    password: {type: DataTypes.STRING, allowNull: false},
    birthDate: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.STRING, defaultValue: 'USER'}
}, {
    timestamps: false
})

const Vacancy = sequelize.define('vacancies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    description: {type: DataTypes.STRING, allowNull: false },
    status: {type: DataTypes.BOOLEAN, defaultValue: true},
    createdAt: {type: DataTypes.DATE, allowNull: false, default: Date.now()},
    updatedAt: {type: DataTypes.DATE, allowNull: false, default: Date.now()}
})

const PracticeExercise = sequelize.define('practiceExercises', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    link: {type: DataTypes.STRING, allowNull: false, unique: true },
    description: {type: DataTypes.STRING, allowNull: false},
    activeFrom: {type: DataTypes.DATE, allowNull: false, default: Date.now()},
    activeTo: {type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false
})

const TheoryTest = sequelize.define('theoryTests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    link: {type: DataTypes.STRING, allowNull: false, unique: true },
    description: {type: DataTypes.STRING, allowNull: false},
    activeFrom: {type: DataTypes.DATE, allowNull: false, default: Date.now()},
    activeTo: {type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false
})

const TheoryTestResult = sequelize.define('theoryTestResults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  }
}, {
    timestamps: false
})

const PracticeResult = sequelize.define('practiceResults', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    link: {type: DataTypes.STRING, allowNull: false, unique: true },
    RecievedPoint: {type: DataTypes.INTEGER, allowNull: true }

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

User.hasMany(TheoryTestResult)
TheoryTestResult.belongsTo(User)

module.exports = {
        User,
        Vacancy,
        TheoryTest,
        TheoryTestResult,
        PracticeExercise,
        PracticeResult
}