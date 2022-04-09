import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import VacanciesStore from "./store/VacanciesStore";

export const Context = createContext(null )


ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        vacancies: new VacanciesStore()
    }}>
        <App />
    </Context.Provider>,

    document.getElementById('root')
);
