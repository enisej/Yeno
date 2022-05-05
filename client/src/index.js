import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import VacanciesStore from "./store/VacanciesStore";
import TestStore from "./store/TestStore";
import PracticeStore from "./store/PracticeStore";
import PracticeResponsesStore from "./store/PracticeResponseStore";
import TestResponsesStore from "./store/TestResponseStore";
export const Context = createContext(null )


ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        vacancies: new VacanciesStore(),
        tests: new TestStore(),
        practices: new PracticeStore(),
        practiceResponses: new PracticeResponsesStore(),
        testResponses: new TestResponsesStore()

    }}>
        <App />
    </Context.Provider>,

    document.getElementById('root')
);
