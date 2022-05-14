import {$authHost, $host} from "./index";


export const fetchVacancies = async (page, limit) => {
    const {data} = await $host.get('api/vacancies', { params: {page, limit }})
    return data

}

export const createVacancy = async (title, description, qualifications, offer, theoryTestId, practiceTestId) => {
    const {data} = await $authHost.post('api/vacancies/create', {title, description, qualifications, offer, theoryTestId, practiceTestId})
    return data
}

export const updateVacancy = async (id) => {
    const {data} = await $authHost.patch('api/vacancies/update/' + id)
    return data
}


export const deleteVacancy = async (id) => {
    const {data} = await $authHost.delete('api/vacancies/delete/' + id)
    return data
}