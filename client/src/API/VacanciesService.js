import axios from "axios";

export default class GetVacancies {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('http://localhost:5000/api/vacancies', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;


    }

}