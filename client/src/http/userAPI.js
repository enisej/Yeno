import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name, surname, birthDate, tel_number, cv, githubLink) => {

    const {data} = await $host.post('api/user/registration', {email, password, name, surname, birthDate, tel_number, cv, githubLink})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
        const {data} = await $authHost.get('api/user/auth')
    if(data.token) {
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }else{
        return console.log("hei")
    }
}

export const deleteUser = async (id) => {
    const {data} = await $authHost.delete('api/user/delete/' + id)
    return {data}
}

export const updateUser = async (id ,email, password, name, surname, birthDate, tel_number, cv, githubLink, status) => {
    const {data} = await $authHost.patch('api/user/update/'+ id, {email, password, name, surname, birthDate, tel_number, cv, githubLink, status})
    localStorage.setItem('token', data.token)
    return data
}

export const getUser = async (id) => {
    const {data} = await $authHost.get('api/user/' + id)
    return data
}



