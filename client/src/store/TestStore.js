import {makeAutoObservable} from "mobx";

export default class testStore {
    constructor() {
        this._theoryTest = [


        ]
        makeAutoObservable(this)
    }

    setTheoryTests(test) {
        this._theoryTest = test
    }

    get tests() {
        return this._theoryTest
    }





}