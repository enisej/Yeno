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
                qualifications:"2+ years’ experience as IT Business Analyst or Systems analyst.\n" +
                    "\n" +
                    "Experience with Agile (e.g. Scrum, Kanban). \n" +
                    "\n" +
                    "Excellent communication skills with project team and all levels of management.\n" +
                    "\n" +
                    "Teamwork and relationship building skills.\n" +
                    "\n" +
                    "Latvian language proficiency.",
                offer:" An exciting position with great responsibility in a fast-growing international company.\n" +
                    "\n" +
                    "A competitive salary based on your experience and qualifications.\n" +
                    "\n" +
                    "Interesting, creative and responsible work in experienced and friendly teams.\n" +
                    "\n" +
                    "Substantial training and opportunities for growth.\n" +
                    "\n" +
                    "Health insurance after trial period.\n" +
                    "\n" +
                    "Remote work.",
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
                qualifications:"2+ years’ experience as IT Business Analyst or Systems analyst.\n" +
                    "\n" +
                    "Experience with Agile (e.g. Scrum, Kanban). \n" +
                    "\n" +
                    "Excellent communication skills with project team and all levels of management.\n" +
                    "\n" +
                    "Teamwork and relationship building skills.\n" +
                    "\n" +
                    "Latvian language proficiency.",
                offer:" An exciting position with great responsibility in a fast-growing international company.\n" +
                    "\n" +
                    "A competitive salary based on your experience and qualifications.\n" +
                    "\n" +
                    "Interesting, creative and responsible work in experienced and friendly teams.\n" +
                    "\n" +
                    "Substantial training and opportunities for growth.\n" +
                    "\n" +
                    "Health insurance after trial period.\n" +
                    "\n" +
                    "Remote work.",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 1,
                theoryTestId: 2,
            },
            {
                id: 2,
                title: "PHP programmer",
                description: "need developer , very good proffesional developer",
                qualifications:"2+ years’ experience as IT Business Analyst or Systems analyst.\n" +
                    "\n" +
                    "Experience with Agile (e.g. Scrum, Kanban). \n" +
                    "\n" +
                    "Excellent communication skills with project team and all levels of management.\n" +
                    "\n" +
                    "Teamwork and relationship building skills.\n" +
                    "\n" +
                    "Latvian language proficiency.",
                offer:" An exciting position with great responsibility in a fast-growing international company.\n" +
                    "\n" +
                    "A competitive salary based on your experience and qualifications.\n" +
                    "\n" +
                    "Interesting, creative and responsible work in experienced and friendly teams.\n" +
                    "\n" +
                    "Substantial training and opportunities for growth.\n" +
                    "\n" +
                    "Health insurance after trial period.\n" +
                    "\n" +
                    "Remote work.",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 1,
                theoryTestId: 2,
            },
            {
                id: 2,
                title: "PHP programmer",
                description: "need developer , very good proffesional developer",
                qualifications:"2+ years’ experience as IT Business Analyst or Systems analyst.\n" +
                    "\n" +
                    "Experience with Agile (e.g. Scrum, Kanban). \n" +
                    "\n" +
                    "Excellent communication skills with project team and all levels of management.\n" +
                    "\n" +
                    "Teamwork and relationship building skills.\n" +
                    "\n" +
                    "Latvian language proficiency.",
                offer:" An exciting position with great responsibility in a fast-growing international company.\n" +
                    "\n" +
                    "A competitive salary based on your experience and qualifications.\n" +
                    "\n" +
                    "Interesting, creative and responsible work in experienced and friendly teams.\n" +
                    "\n" +
                    "Substantial training and opportunities for growth.\n" +
                    "\n" +
                    "Health insurance after trial period.\n" +
                    "\n" +
                    "Remote work.",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 1,
                theoryTestId: 2,
            },
            {
                id: 2,
                title: "PHP programmer",
                description: "need developer , very good proffesional developer",
                qualifications:"2+ years’ experience as IT Business Analyst or Systems analyst.\n" +
                    "\n" +
                    "Experience with Agile (e.g. Scrum, Kanban). \n" +
                    "\n" +
                    "Excellent communication skills with project team and all levels of management.\n" +
                    "\n" +
                    "Teamwork and relationship building skills.\n" +
                    "\n" +
                    "Latvian language proficiency.",
                offer:" An exciting position with great responsibility in a fast-growing international company.\n" +
                    "\n" +
                    "A competitive salary based on your experience and qualifications.\n" +
                    "\n" +
                    "Interesting, creative and responsible work in experienced and friendly teams.\n" +
                    "\n" +
                    "Substantial training and opportunities for growth.\n" +
                    "\n" +
                    "Health insurance after trial period.\n" +
                    "\n" +
                    "Remote work.",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 1,
                theoryTestId: 2,
            },
            {
                id: 2,
                title: "PHP programmer",
                description: "need developer , very good proffesional developer",
                qualifications:"2+ years’ experience as IT Business Analyst or Systems analyst.\n" +
                    "\n" +
                    "Experience with Agile (e.g. Scrum, Kanban). \n" +
                    "\n" +
                    "Excellent communication skills with project team and all levels of management.\n" +
                    "\n" +
                    "Teamwork and relationship building skills.\n" +
                    "\n" +
                    "Latvian language proficiency.",
                offer:" An exciting position with great responsibility in a fast-growing international company.\n" +
                    "\n" +
                    "A competitive salary based on your experience and qualifications.\n" +
                    "\n" +
                    "Interesting, creative and responsible work in experienced and friendly teams.\n" +
                    "\n" +
                    "Substantial training and opportunities for growth.\n" +
                    "\n" +
                    "Health insurance after trial period.\n" +
                    "\n" +
                    "Remote work.",
                status: true,
                createdAt: "2022-04-03T14:50:43.690Z",
                updatedAt: "2022-04-03T14:50:43.690Z",
                practiceExerciseId: 1,
                theoryTestId: 2,
            },

        ]
    makeAutoObservable(this)
    }

    setVacancies(vacancies) {
        this._vacancies = vacancies
    }


    get vacancies() {
        return this._vacancies
    }





}