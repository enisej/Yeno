import {makeAutoObservable} from "mobx";

export default class RequestedVacanciesStore {
    constructor() {
        this._requestedVacancies = []
        makeAutoObservable(this)
    }

    setRequestedVacancies(requestedVacancies) {
        this._requestedVacancies = requestedVacancies
    }

    get RequestVacancies() {
        return this._requestedVacancies


    }

}