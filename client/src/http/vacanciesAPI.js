import {$authHost, $host} from "./index";


export const fetchVacancies = async (page, limit) => {
    const {data} = await $host.get('api/vacancies', { params: {page, limit }})
    return data

}

export const fetchAllVacancies = async (page, limit) => {
    const {data} = await $authHost.get('api/vacancies/all', { params: {page, limit }})
    return data

}

export const createVacancy = async (title, description, qualifications, offer, theoryTestId, practiceExerciseId) => {
    const {data} = await $authHost.post('api/vacancies/create', {title, description, qualifications, offer, theoryTestId, practiceExerciseId})
    return data
}

export const updateVacancy = async (id, title, description, qualifications, offer, theoryTestId, practiceExerciseId, status) => {
    const {data} = await $authHost.patch('api/vacancies/update/' + id, {title, description, qualifications, offer, theoryTestId, practiceExerciseId, status})
    return data
}


export const deleteVacancy = async (id) => {
    const {data} = await $authHost.delete('api/vacancies/delete/' + id)
    return data
}

export const sortVacancyByName = async (page, limit, sort) => {
    const {data} = await $authHost.get('api/vacancies/sort/name?sort=' + sort, { params: {page, limit }})
    return data

}

export const sortVacancyByDate = async (page, limit, sort) => {
    const {data} = await $authHost.get('api/vacancies/sort/date?sort=' + sort, { params: {page, limit }})
    return data

}

export const sortVacancyByStatus = async (page, limit, sort) => {
    const {data} = await $authHost.get('api/vacancies/sort/status?sort=' + sort, { params: {page, limit }})
    return data

}