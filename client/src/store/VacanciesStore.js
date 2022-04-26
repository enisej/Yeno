import {makeAutoObservable} from "mobx";

export default class VacanciesStore {
    constructor() {
        this._vacancies = []
    makeAutoObservable(this)
    }

    setVacancies(vacancies) {
        this._vacancies = vacancies
    }


    get vacancies() {
        return this._vacancies
    }





}