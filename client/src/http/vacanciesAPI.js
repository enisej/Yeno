import {$authHost, $host} from "./index";


export const fetchVacancies = async () => {
    const {data} = await $host.get('api/vacancies')
    return data

}

export const createVacancy = async (vacancy) => {
    const {data} = await $authHost.post('api/vacancies/create', vacancy)
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