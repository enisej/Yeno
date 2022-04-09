import Home from "./pages/home";
import Vacancies from "./pages/vacancies";
import PracticePage from "./pages/Tests/practicePage";
import TestPage from "./pages/Tests/testPage";
import TestResponses from "./pages/Tests/testResponses";
import PracticeResponses from "./pages/Tests/practiceResponses";
import Auth from "./pages/authorization/Auth";
import Register from "./pages/authorization/register";

import {
    HOME_ROUTE, LOGIN_ROUTE,
    PRACTICE_RESPONSE_ROUTE,
    PRACTICE_ROUTE, REGISTER_ROUTE,
    TEST_RESPONSE_ROUTE,
    TEST_ROUTE,
    VACANCIES_ROUTE
} from "./utils/consts";


export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: VACANCIES_ROUTE ,
        Component: Vacancies
    },
    {
        path: PRACTICE_ROUTE + '/:id',
        Component: PracticePage
    },
    {
        path: TEST_ROUTE + '/:id',
        Component: TestPage
    },
    {
        path: TEST_RESPONSE_ROUTE,
        Component: TestResponses
    },
    {
        path: PRACTICE_RESPONSE_ROUTE,
        Component: PracticeResponses
    },




]


export const publicRoutes = [

    {
        path: HOME_ROUTE,
        Component: Home
    },

    {
        path: VACANCIES_ROUTE,
        Component: Vacancies
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Register
    }



]