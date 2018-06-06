import * as api from '../api/index.js';
import md5 from 'md5';

export default {
    state: {
        token: sessionStorage.getItem("token")
    },
    actions: {
        getVercode({commit}){
            return api.getVercode().then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                })  
            }).catch(e => {
                console.log(e);
            })
        },
        login({commit}, obj){
            return api.login(obj).then(res => {
                if(res.data.result === 200){
                    let randomStr = md5(obj.password);
                    commit("createToken", randomStr);
                }
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                })
            })
        }
    },
    mutations: {
        createToken(state, str){
            state.token = str;
            sessionStorage.setItem("token",str);
        },
        deleteToken(state){
            state.token = null;
            sessionStorage.removeItem("token");
        }
    }
}