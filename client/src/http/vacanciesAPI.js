import {$host} from "./index";


export const fetchVacancies = async () => {
    const {data} = await $host.get('api/vacancies')
    return data

}