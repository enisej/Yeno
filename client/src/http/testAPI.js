import {$authHost} from "./index";

export const fetchTests = async () => {
    const {data} = await $authHost.get('api/test')
    return data

}

export const fetchByTestId= async (id) => {
    const {data} = await $authHost.get('api/test/' + id)
    return data

}

export const createTest = async (test) => {
    const {data} = await $authHost.post('api/test/create', test)
    return data
}

export const updateTest = async (id) => {
    const {data} = await $authHost.patch('api/test/update/', id)
    return data
}


export const deleteTest = async (id) => {
    const {data} = await $authHost.delete('api/test/delete/', id)
    return data
}