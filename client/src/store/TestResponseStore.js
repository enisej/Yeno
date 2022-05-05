import {makeAutoObservable} from "mobx";

export default class TestResponsesStore {
    constructor() {
        this._testResponses = [

        ]
        makeAutoObservable(this)
    }

    setTestResponse(testResponse) {
        this._testResponses = testResponse
    }

    get TestResponses() {
        return this._testResponses
    }





}