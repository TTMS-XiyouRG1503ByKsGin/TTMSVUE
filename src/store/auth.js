import * as api from '../api/index.js';
import md5 from 'md5';

export default {
    state: {
        account: '',
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
                console.log(obj);
                if(res.data.result === 200){
                    let randomStr = md5(obj.password);
                    let data = {str: randomStr, account: obj.username};
                    commit("createToken", data);
                }
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                })
            })
        }
    },
    mutations: {
        createToken(state, obj){
            state.token = obj.str;
            state.account = obj.account;
            sessionStorage.setItem("token",obj.str);
        },
        deleteToken(state){
            state.token = null;
            state.account = "";
            sessionStorage.removeItem("token");
        }
    }
}