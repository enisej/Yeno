import {$authHost} from "./index";

export const fetchPracticeTests = async () => {
    const {data} = await $authHost.get('api/practice')
    return data

}

export const fetchByPracticeId= async (id) => {
    const {data} = await $authHost.get('api/practice/'+ id)
    return data

}

export const createPracticeTest = async (practice) => {
    const {data} = await $authHost.post('api/practice/create', practice)
    return data
}

export const updatePractice = async (id) => {
    const {data} = await $authHost.patch('api/practice/update/', id)
    return data
}


export const deleteTest = async (id) => {
    const {data} = await $authHost.delete('api/test/delete/', id)
    return data
}