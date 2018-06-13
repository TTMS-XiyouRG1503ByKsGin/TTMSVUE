import * as api from '../api/index.js';

export default{
    state: {
        cinema: [],
        cinemaMore: [],
        play: [],
        plan: [],
        ticketMore: [],
        selectTicket: [],
        user: [],
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
        },
        GET_ALL_PLAY({commit}){
            return api.getAllPlay().then(res=>{
                if(res.data.result === 200){
                    commit("get_all_play",res.data.data);
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                })
            })
        },
        GET_PLAY_BYID({commit}, id){
            return api.getPlayById(id).then(res=>{
                if(res.data.result === 200){
                    commit("get_current_play", res.data.data);
                }
            }).catch(e=>{
                return new Promise((resolve, reject)=>{
                    reject(e);
                });
            });
        },
        DEL_PLAY_BYID({commit}, id){
            return api.delPlayById(id).then(res=>{
                if(res.data.result === 204){       
                    api.getAllPlay().then(res => {
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("get_all_play", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                })
            }).catch(e=>{
                return new Promise((resolve, reject)=>{
                    reject(e);
                });
            });
        },
        UPD_PLAY_BYID({commit}, obj){
            return api.updPlayById(obj.programmeId, obj.programmeName, obj.programmeDruation, obj.programmeTags, obj.programmeProfile, obj.file).then(res=>{
                console.log(res);
                console.log(obj);
                if(res.data.result === 200){
                    api.getAllPlay().then(res => {
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("get_all_play", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        ADD_PLAY({commit},obj){
            return api.addPlay(obj.programmeName, obj.programmeDruation, obj.programmeTags, obj.programmeProfile, obj.file).then(res=>{
                if(res.data.result === 200){
                    api.getAllPlay().then(res => {
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("get_all_play", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve, reject)=>{
                    reject(e);
                });
            });
        },
        GET_ALL_PLAN({commit}){
            return api.getAllPlan().then(res=>{
                if(res.data.result === 200){
                    let arr = res.data.data;
                    commit("get_all_plan", arr);
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve, reject)=>{
                    reject(e);
                })
            })
        },
        ADD_PLAN({commit}, obj){
            return api.addPlan(obj).then(res=>{
                if(res.data.result === 200){
                    api.getAllPlan().then(res=>{
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("get_all_plan", arr);
                        }
                    })
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        DEL_PLAN_BYID({commit}, id){
            return api.delPlanById(id).then(res=>{
                if(res.data.result === 200){
                    api.getAllPlan().then(res=>{
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("get_all_plan", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                })
            }).catch(e=>{
                return new Promise((resolve, reject)=>{
                    reject(e);
                });
            });
        },
        UPD_PLAN_BYID({commit}, obj){
            return api.updPlanById(obj).then(res=>{
                if(res.data.result === 200){
                    api.getAllPlan().then(res=>{
                        if(res.data.result === 200){
                            let arr = res.data.data;
                            commit("get_all_plan", arr);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve, reject)=>{
                    reject(e);
                });
            });
        },
        GET_TICKETMORE_BYID({commit}, id){
            return api.getTicketMoreById(id).then(res=>{
                if(res.data.result === 200){
                    commit('get_all_ticketMore', res.data.data);
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        SELECT_TICKET({commit}, obj){
            return api.selectTicket(obj.id).then(res=>{
                if(res.data.result === 200){
                    api.getTicketMoreById(obj.goodId).then(res=>{
                        if(res.data.result === 200){
                            commit('get_all_ticketMore', res.data.data);
                        }
                    });
                }
                return new Promise((resolve,reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        PAY_TICKET({commit}, obj){
            return api.payTicket(obj).then(res=>{
                if(res.data.result === 200){
                    api.getTicketMoreById(obj.goodId).then(res=>{
                        if(res.data.result === 200){
                            commit('get_all_ticketMore', res.data.data);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        GET_ALL_USER({commit}){
            return api.getAlLUser().then(res=>{
                if(res.data.result === 200){
                    commit("get_all_user", res.data.data);
                }
                return new Promise((resolve, reject)=>{
                    resolve(res);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        ADD_USER({commit}, obj){
            return api.addUser(obj).then(res=>{
                if(res.data.result === 200){
                    api.getAlLUser().then(res=>{
                        if(res.data.result === 200){
                            commit("get_all_user", res.data.data);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                })
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                });
            });
        },
        UPD_USER_BYID({commit}, obj){
            return api.updUser(obj).then(res=>{
                if(res.every(item=>{
                    return item.data.result === 200;
                })){
                    api.getAlLUser().then(res=>{
                        if(res.data.result === 200){
                            commit("get_all_user", res.data.data);
                        }
                    });
                }
                return new Promise((resolve,reject)=>{
                    if(res.every(item=>{
                        return item.data.result === 200;
                    })){
                        resolve("更新成功");
                    }else{
                        resolve("更新失败");
                    }
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                })
            });
        },
        DEL_USER_BYID({commit}, id){
            return api.delUser(id).then(res=>{
                if(res.data.result === 204){
                    api.getAlLUser().then(res=>{
                        if(res.data.result === 200){
                            commit("get_all_user", res.data.data);
                        }
                    });
                }
                return new Promise((resolve, reject)=>{
                    resolve(res.data);
                });
            }).catch(e=>{
                return new Promise((resolve,reject)=>{
                    reject(e);
                }) 
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
        },
        get_all_play(state,data){
            state.play = data;
        },
        get_all_plan(state, data){
            state.plan = data;
        },
        get_all_ticketMore(state,data){
            state.ticketMore = data;
        },
        clearTicketMore(state){
            state.ticketMore = [];
        },
        upd_select_ticket(state, data){
            state.selectTicket = data;
        },
        get_all_user(state, data){
            state.user = data;
        },
    }
}