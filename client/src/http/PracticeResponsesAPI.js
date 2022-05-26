import {$authHost} from "./index";


export const fetchResponsesByUser = async (userId) => {
    const {data} = await $authHost.get('api/practice_results/userid/?userId=' + userId)
    return data

}

export const fetchResponsesByTestId = async(practiceId) => {
    const {data} = await $authHost.get('api/practice_results/testid/?practiceExerciseId=' + practiceId)
    return data
}

export const createResponses = async (practiceResponses) => {
    const {data} = await $authHost.post('api/practice_results/create', practiceResponses)
    return data
}

export const sendFeedback = async (id, RecievedPoints, Feedback) => {
    const {data} = await $authHost.patch('api/practice_results/feedback/'+ id)
    return data
}


export const deleteResponses = async (id) => {
    const {data} = await $authHost.delete('api/practice_results/delete/' + id)
    return data
}