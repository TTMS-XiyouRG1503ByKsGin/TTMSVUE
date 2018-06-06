import axios from 'axios';

const URL = "http://123.206.82.241/";

//获取验证码
export function getVercode(){
    const url = `${URL}/Home/VerCode`;
    return axios.get(url);
}

//登录
export function login(obj){
    let { username, password, vercode } = obj;
    let newObj = {
        account: username,
        password: password,
        verCode: vercode
    }
    const url = `${URL}/User/Login`;
    return axios.post(url, newObj);
}

