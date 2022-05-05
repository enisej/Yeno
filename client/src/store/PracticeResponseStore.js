import {makeAutoObservable} from "mobx";

export default class PracticeResponsesStore {
    constructor() {
        this._practiceResponses = []
        makeAutoObservable(this)
    }

    setPracticeResponse(practiceResponse) {
        this._practiceResponses = practiceResponse
    }

    get practiceResponses() {
        return this._practiceResponses
    }





}