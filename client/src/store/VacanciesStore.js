import {makeAutoObservable} from "mobx";

export default class VacanciesStore {
    constructor() {
        this._vacancies = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
    makeAutoObservable(this)
    }

    setVacancies(vacancies) {
        this._vacancies = vacancies
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get vacancies() {
        return this._vacancies
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

}