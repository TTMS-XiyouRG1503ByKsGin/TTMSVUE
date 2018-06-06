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