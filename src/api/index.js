import axios from 'axios';

// const URL = "http://123.206.82.241:8080";
const URL = "http://localhost:8088";

//获取验证码
export function getVercode(){
    const url = `${URL}/Home/VerCode`;
    return axios.get(url,{
        withCredentials: true
    });
}

//登录
export function login(obj){
    let { username, password, vercode } = obj;
    let newObj = {
        account: username,
        password: password,
        verCode: vercode,
    }
    const url = `${URL}/User/Login`;
    return axios({
        method: "POST",
        url: url,
        data: newObj,
        withCredentials: true
    });
}

//获取所有影厅
export function getCinemaAll(){
    const url = `${URL}/Theater`;
    return axios.get(url,{
        withCredentials: true
    });
};

//根据影厅ID获取座位详情
export function getCinemaMoreById(id){
    const url = `${URL}/Seat/SelectSeat/${id}`;
    return axios.get(url,{
        withCredentials: true
    });
}
//更新影厅座位状态
export function updateCinemaSeatById(id,status){
    const url = `${URL}/Seat/UpdateSeatStatus`;
    return axios({
        url,
        method: "PATCH",
        data: {"seatId": id, "status": status},
        withCredentials: true
    });
}


