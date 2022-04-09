import {makeAutoObservable} from "mobx";

export default class VacanciesStore {
    constructor() {
        this._vacancies = [
            {
                id: 1,
                title: "python programmer",
                description:" need developer , very good proffesional developer" +
                    "need developer , very good proffesional developer" +
                    "need developer , very good proffesional developer" +
                    "need developer , very good proffesional developer" +
                    "need developer , very good proffesional developer" +
                    "need developer , very good proffesional developer",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 2,
                theoryTestId: 1,
            },
            {
                id: 2,
                title: "PHP programmer",
                description: "need developer , very good proffesional developer",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 1,
                theoryTestId: 0,
            },

        ]
        this._selectedVacancy = {}
    makeAutoObservable(this)
    }

    setVacancies(vacancies) {
        this._vacancies = vacancies
    }

    setSelectedVacancy(vacancy) {
        this._selectedVacancy = vacancy
    }

    get selectedVacancy() {
        return this._selectedVacancy
    }

    get vacancies() {
        return this._vacancies
    }





}