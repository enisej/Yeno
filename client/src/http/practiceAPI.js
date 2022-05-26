import {$authHost} from "./index";

export const fetchPracticeTests = async () => {
    const {data} = await $authHost.get('api/practice')
    return data

}

export const fetchByPracticeId= async (id) => {
    const {data} = await $authHost.get('api/practice/'+ id)
    return data

}

export const createPracticeTest = async (title, link, description) => {
    const {data} = await $authHost.post('api/practice/create', {title, link, description})
    return data
}

export const updatePractice = async (id,title, link, description) => {
    const {data} = await $authHost.patch('api/practice/update/'+ id, {title, link, description})
    return data
}


export const deletePractice = async (id) => {
    const {data} = await $authHost.delete('api/practice/delete/'+ id)
    return data
}