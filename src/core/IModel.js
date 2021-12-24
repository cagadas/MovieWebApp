import axios from 'axios';

export default class IStore {

    model = "";
    path = "https://api.themoviedb.org/3/";
    apiKey = ""

    constructor(model) {
        this.model = model;
    }


    find(criteria) {
        return new Promise((resolve, reject) => {
            var path = this.path
            if (criteria.length > 0)
                criteria.forEach((t, index) => {
                    path += index + 1 === criteria.length ? t + "?api_key=" + this.apiKey : t + "/"
                })
            axios.get(path).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response);
            });
        })
    };

}