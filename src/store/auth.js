import * as api from '../api/index.js';
import md5 from 'md5';

export default {
    state: {
        account: sessionStorage.getItem("account"),
        token: sessionStorage.getItem("token"),
        userId: sessionStorage.getItem("userInfo"),
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
                    //登陆成功后的唯一凭证需要重新获取
                    let randomStr = md5(obj.password);
                    let data = {str: randomStr, account: obj.username};
                    commit("createToken", data);
                }
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                })
            })
        },
        getUserInfoByAccount({commit}, acc){
            return api.getUserInfoByAccount(acc).then(res=>{
                if(res.data.result === 200){
                    commit("getUserInfo",res.data.data);
                }
                return new Promise((resolve,reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        }
    },
    mutations: {
        createToken(state, obj){
            state.token = obj.str;
            state.account = obj.account;
            sessionStorage.setItem("token",obj.str);
            sessionStorage.setItem("account",obj.account);
        },
        deleteToken(state){
            state.token = null;
            state.account = "";
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("account");
            sessionStorage.removeItem("userInfo");
        },
        getUserInfo(state,data){
            state.userInfo = data;
            sessionStorage.setItem("userInfo",data.userId);
        }
    }
}