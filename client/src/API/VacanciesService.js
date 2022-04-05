import {$host} from "./index.js";

export const fetchVacancies = async () => {

    const {data} = await $host.get('api/vacancies')
    return data
}
