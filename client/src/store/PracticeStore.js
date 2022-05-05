import {makeAutoObservable} from "mobx";

export default class PracticeStore {
    constructor() {
        this._practiceTest = [

        ]
        makeAutoObservable(this)
    }

    setPracticeTest(practice) {
        this._practiceTest = practice
    }

    get practices() {
        return this._practiceTest
    }





}