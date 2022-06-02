import Home from "./pages/home";
import Vacancies from "./pages/vacancies";
import PracticePage from "./pages/Tests/practicePage";
import TestPage from "./pages/Tests/testPage";
import TestResponses from "./pages/Tests/testResponses";
import PracticeResponses from "./pages/Tests/practiceResponses";
import Auth from "./pages/authorization/Auth";
import Register from "./pages/authorization/register";
import Profile from "./pages/authorization/profile";
import VacancyTestPage from "./pages/Tests/VacancyTestPage";
import UserResponses from "./pages/Tests/userResponses";
import TestsPage from "./pages/Tests/TestsPage";
import PracticesPage from "./pages/Tests/PracticesPage";
import RequestedVacanciesPage from "./pages/RequestedVacanciesPage";

import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    PRACTICE_RESPONSE_ROUTE,
    PRACTICE_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE,
    TEST_RESPONSE_ROUTE,
    TEST_ROUTE,
    ALL_TEST_ROUTE,
    VACANCIES_ROUTE,
    USER_RESPONSES_ROUTE,
    TESTS_ROUTE,
    PRACTICES_ROUTE,
    REQUESTED_VACANCIES_ROUTE, USERS_ROUTE,
} from "./utils/consts";
import UserListPage from "./pages/authorization/UserListPage";


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
        path: ALL_TEST_ROUTE + '/:theoryTestId/:practiceExerciseId',
        Component: VacancyTestPage
    },
    {
      path: TESTS_ROUTE,
      Component: TestsPage
    },
    {
        path: PRACTICES_ROUTE,
        Component: PracticesPage
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
        path: TEST_RESPONSE_ROUTE + '/:id',
        Component: TestResponses
    },
    {
        path: PRACTICE_RESPONSE_ROUTE + '/:id',
        Component: PracticeResponses
    },
    {
        path: USER_RESPONSES_ROUTE,
        Component: UserResponses
    },
    {
      path: PROFILE_ROUTE,
        Component: Profile

    },
    {
        path: REQUESTED_VACANCIES_ROUTE,
        Component: RequestedVacanciesPage
    },
    {
        path: USERS_ROUTE,
        Component: UserListPage
    }





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