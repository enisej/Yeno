import {$authHost} from "./index";


export const AddRequestedVacancy = async (vacancyId, userId) => {
    const {data} = await $authHost.post('api/requested_vacancies/create', {vacancyId, userId})
    return data

}

export const GetRequestedVacancy = async (userId) =>{
    const {data} = await $authHost.get('api/requested_vacancies/?userId=' + userId)
    return data
}

export const GetRequestedVacancyByUserAndTest = async (userId, practiceExerciseId) =>{
    const {data} = await $authHost.get('api/requested_vacancies/req/?userId=' + userId + '&practiceExerciseId=' + practiceExerciseId)
    return data
}

export const deleteRequestedVacancy = async (id) =>{
    const {data} = await $authHost.delete('api/requested_vacancies/delete/' + id)
    return data
}



