import * as api from '../api/index.js';

export default{
    state: {
        cinema: [],
        cinemaMore: []
    },
    actions:{
        GETALLCINEMA({commit}){
            return api.getCinemaAll().then(res => {
                if(res.data.result === 200){
                    let arr = res.data.data;
                    commit("getAllCinema", arr);
                }
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                });
            }).catch(e => {
                return new Promise((resolve, reject) => {
                    reject(e);
                });
            });
        },
        GETCINEMAMOREBYID({commit}, id){
            return api.getCinemaMoreById(id).then(res => {
                if(res.data.result === 200){
                    commit("getCinemaMoreById",res.data.data);
                }
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                });
            }).catch(e => {
                return new Promise((resolve, reject) => {
                    reject(e);
                });
            });
        },
        UPDATE_CINEMASEAT_BYID({commit}, obj){
            const id = obj.seatId;
            const status = obj.status;
            const theaterId = obj.theaterId;
            return api.updateCinemaSeatById(id,status).then(res=>{
                if(res.data.result === 200){
                    api.getCinemaMoreById(theaterId).then(res=>{
                        if(res.data.result === 200){
                            commit("getCinemaMoreById",res.data.data);
                        }
                    }).catch(e=>{
                        console.log(e);
                    })
                }
                return new Promise((resolve, reject) => {
                    resolve(res.data);
                })
            }).catch(e=>{
                return new Promise((resolve, reject) => {
                    reject(e);
                })
            })
        },
        ADD_CINEMA({commit}, obj){
            return api.addCinema(obj.theaterName, obj.theaterLocation, obj.seatRowCount, obj.seatColCount).then(res=>{
                if(res.data.result === 200){
                    api.getCinemaAll().then(res => {
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("getAllCinema", arr);
                        }
                    });
                }
                return new Promise((resolve,reject)=>{
                    resolve(res.data);
                })
            }).catch(e=>{
                console.log(e);
            })
        },
        DEL_CINEMA_BYID({commit},obj){
            return api.delCinemaById(obj.theaterId, obj.theaterName, obj.location, obj.mapSite).then(res=>{
                if(res.data.result === 200){
                    api.getCinemaAll().then(res => {
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("getAllCinema", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=> {
                    resolve(res.data);
                })
            }).catch(e=>{
                console.log(e);
            })
        },
        UPD_CINEMA_BYID({commit},obj){
            return api.updCinemaById(obj.theaterId, obj.theaterName, obj.location).then(res=>{
                if(res.data.result === 200){
                    api.getCinemaAll().then(res => {
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("getAllCinema", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=> {
                    resolve(res.data);
                })
            }).catch(e=>{
                console.log(e);
            });
        }
        
    },
    mutations:{
        getAllCinema(state, obj){
            state.cinema = obj;
        },
        getCinemaMoreById(state, obj){
            state.cinemaMore = obj;
        },
        clearCinemaMore(state){
            state.cinemaMore = [];
        }
    }
}