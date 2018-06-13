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

//根绝账号获取用户信息
export function getUserInfoByAccount(acc){
    const url = `${URL}/User/QueryUserByAccount/${acc}`;
    return axios.get(url,{
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

//根据id获取影厅
export function getCinemaById(id){
    const url = `${URL}/Theater/QueryTheater/${id}`;
    return axios.get(url,{
        withCredentials: true
    });
}

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

//添加影厅
export function addCinema(theaterName, location, seatRowCount, seatColCount, mapSite=""){
    const url = `${URL}/Theater/CreateTheater`;
    seatRowCount = Number(seatRowCount);
    seatColCount = Number(seatColCount);
    const data = {
        theaterName,
        location,
        mapSite,
        seatRowCount,
        seatColCount
    };
    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//根据id删除影厅
export function delCinemaById(id){
    const url = `${URL}/Theater/DeleteTheater/${id}`;
    return axios({
        url,
        method: "DELETE",
        withCredentials: true
    });
};

//根据id修改影厅
export function updCinemaById(theaterId, theaterName, location, mapSite=""){
    const url = `${URL}/Theater/UpdateTheater`;
    let data = {
        theaterId,
        theaterName,
        location,
        mapSite
    };
    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//获取剧目信息
export function getAllPlay(){
    const url = `${URL}/Programme/GetWithImagePath`;
    return axios.get(url,{
        withCredentials: true
    });
}

//根据id获取剧目信息
export function getPlayById(id){
    const url = `${URL}/Programme/QueryProgrammeById/${id}`;
    return axios.get(url,{
        withCredentials: true
    });
}

//根据id删除剧目
export function delPlayById(id){
    const url = `${URL}/Programme/DeleteProgramme/${id}`;
    return axios({
        url,
        method: "DELETE",
        withCredentials: true
    });
}

//根据id更新剧目
export function updPlayById(programmeId, programmeName, programmeDruation, programmeTags, programmeProfile, file){
    const url = `${URL}/Programme/UpdateProgramme`;
    let data = new FormData();
    data.append("programmeId", programmeId);
    data.append("programmeName", programmeName);
    data.append("duration", programmeDruation);
    data.append("tags", programmeTags);
    data.append("profile", programmeProfile);
    data.append("file", file);

    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//添加剧目
export function addPlay(programmeName, duration, tags, profile, file){
    const url = `${URL}/Programme/CreateProgrammeAndPlayBill`;
    let data = new FormData();
    data.append("programmeName",programmeName);
    data.append("duration", duration);
    data.append("tags", tags);
    data.append("profile", profile);
    data.append("file", file);

    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//获取演出计划
export function getAllPlan(){
    const url = `${URL}/Good/GetWithName`;
    return axios.get(url,{
        withCredentials: true
    });
}

//添加演出计划
export function addPlan(obj){
    let url = `${URL}/Good/CreateGood`;
    let data = {
        programmeId: obj.programmeId,
        theaterId: obj.theaterId,
        performance: obj.performance,
        playDate: obj.playDate,
        price: obj.price
    };
    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//根据id删除演出计划
export function delPlanById(id){
    const url = `${URL}/Good/DeleteGood/${id}`;
    return axios({
        url,
        method: "DELETE",
        withCredentials: true
    });
}

//根据id修改演出计划
export function updPlanById(obj){
    const url = `${URL}/Good/UpdateGood`;
    let data = {
        goodId: obj.goodId,
        programmeId: obj.programmeId,
        theaterId: obj.theaterId,
        performance: obj.performance,
        playDate: obj.playDate,
        price: obj.price
    };
    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//根据演出计划id获取票的信息
export function getTicketMoreById(id){
    const url = `${URL}/Ticket/SelectTicket/${id}`;
    return axios.get(url,{
        withCredentials: true
    });
}

//根据id订票
export function selectTicket(id){
    const url = `${URL}/Ticket/SellTicket/${id}`;
    return axios({
        url,
        method:"post",
        withCredentials: true
    });
};

//根据ticketId和userId支付
export function payTicket(obj){
    const url = `${URL}/Ticket/PayTicket/${obj.ticketId}&${obj.userId}`;
    return axios({
        url,
        method: "POST",
        withCredentials: true
    });
};

//获取所有用户
export function getAlLUser(){
    const url = `${URL}/User`;
    return axios.get(url,{
        withCredentials: true
    });
};

//添加用户
export function addUser(obj){
    const url = `${URL}/User/CreateUser`;
    let data = {
        name: obj.name,
        account:obj.account,
        password: obj.password,
        level: obj.level,
        sex: obj.sex,
        tel: obj.tel,
        theaterId: obj.theaterId
    }
    return axios({
        url,
        method: "POST",
        data,
        withCredentials: true
    });
}

//根据id删除用户
export function delUser(id){
    const url = `${URL}/User/DeleteUser/${id}`;
    return axios({
        url,
        method: "DELETE",
        withCredentials: true
    });
};

//修改用户
export function updUser(obj){
    console.log(obj);
    const urlLevel = `${URL}/User/UpdateUserLevel`;
    const urlPass = `${URL}/User/UpdateUserPassword`;
    const urlTel = `${URL}/User/UpdateUserTel`;

    let arr = [];
    arr.push(axios({
        url: urlLevel,
        method: "POST",
        data: {id: obj.userId, level: obj.level},
        withCredentials: true
    }));
    arr.push(axios({
        url: urlPass,
        method: "POST",
        data: {id: obj.userId, password: obj.password},
        withCredentials: true
    }));
    arr.push(axios({
        url: urlTel,
        method: "POST",
        data: {id: obj.userId, tel: obj.tel},
        withCredentials: true
    }));
    return Promise.all(arr);
}