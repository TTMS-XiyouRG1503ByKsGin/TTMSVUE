import * as api from '../api/index.js';

export default {
    state: {
        // session: ''
    },
    actions: {
        getVercode({commit}){
            return api.getVercode().then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                })  
            })
        },
        login({commit}, obj){
            return api.login(obj).then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res);
                })
            })
        }
    },
    mutations: {
        
    }
}