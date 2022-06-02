import {$authHost} from "./index";


export const fetchResponsesByUser = async (userId) => {
    const {data} = await $authHost.get('api/practice_results/userid/?userId=' + userId)
    return data

}

export const fetchResponsesByTestId = async(practiceId) => {
    const {data} = await $authHost.get('api/practice_results/testid/?practiceExerciseId=' + practiceId)
    return data
}

export const createResponses = async (responseLink, userId, practiceExerciseId) => {
    const {data} = await $authHost.post('api/practice_results/create', {responseLink, userId, practiceExerciseId})
    return data
}

export const sendFeedback = async (id, RecievedPoints, Feedback, responseDescription) => {
    const {data} = await $authHost.patch('api/practice_results/feedback/'+ id , {RecievedPoints, Feedback, responseDescription})
    return data
}

export const checkIfResponseExists = async (userId, practiceExerciseId) => {
    const {data} = await $authHost.get('api/practice_results/user/test/?userId='+userId+ '&practiceExerciseId=' + practiceExerciseId)
    return data
}


export const deleteResponses = async (id) => {
    const {data} = await $authHost.delete('api/practice_results/delete/' + id)
    return data
}