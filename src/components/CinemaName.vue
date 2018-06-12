<template>
    <div class="CinemaName">
        <div class="CinemaName-content">
            <div class="CinemaName-content-btn content-btn" @click="addCinema">添加影厅</div>
            <div class="CinemaName-content-main">
                <div class="CinemaName-content-main-title">
                    <span class="CinemaName-content-main-id">影厅ID</span>
                    <span class="CinemaName-content-main-name">影厅名称</span>
                    <span class="CinemaName-content-main-location">影厅地点</span>
                    <span class="CinemaName-content-main-action">操作</span>
                </div>
                <div class="CinemaName-content-main-list">
                    <div class="CinemaName-content-main-list-item " v-for="(item, index) in cinema" :key="item.theaterId">
                        <span class="CinemaName-content-main-id">{{ item.theaterId }}</span>
                        <span class="CinemaName-content-main-name">{{ item.theaterName }}</span>
                        <span class="CinemaName-content-main-location">{{ item.theaterLocation }}</span>
                        <span class="CinemaName-content-main-action">
                            <a href="javascript:void(0)" class="CinemaName-content-main-action-mor action-btn" @click="() =>{getCinemaInfo(index)}">详情</a>
                            <a href="javascript:void(0)" class="CinemaName-content-main-action-del action-btn" @click="()=>{delCinema(index)}">删除</a>
                            <a href="javascript:void(0)" class="CinemaName-content-main-action-upd action-btn" @click="()=>{updCinema(index)}">修改</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <ActionBox :actionType="actionType" :visible="visible" :title="title" :baseVal="baseVal" :listArr="listArr" @changeVisible="changeVisible"></ActionBox>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import ActionBox from './ActionBox.vue';
export default {
    name: 'cinemaName',
    components:{
        ActionBox
    },
    data(){
        return{
            actionType: "",
            visible: false,
            title: "",
            baseVal: -1,
            listArr: [],
        }
    },
    created(){
        this.$store.dispatch("GETALLCINEMA");
    },
    computed: {
        ...mapState({
            cinema(state){
                return state.manger.cinema;
            }
        })
    },
    methods:{
        getCinemaInfo(index){
            const id = this.cinema[index].theaterId;
            // const count = this.cinema[index].theaterSeatColsCount;
            // const row = this.cinema[index].theaterSeatRowsCount;
            this.$router.push(`/admin/cinema/info?id=${id}`);
        },
        addCinema(){
            this.actionType = "addCinema";
            this.visible = true;
            this.title = "添加";
            this.listArr = [
                { name: "影厅名称", ref: "theaterName", type: "text" },
                { name: "影厅地点", ref: "theaterLocation", type: "text" },
                { name: "行数", ref: "seatRowCount", type: "text" },
                { name: "列数", ref: "seatColCount", type: "text" }
            ];

        },
        changeVisible(visible){
            this.visible = visible;
        },
        delCinema(index){
            this.$confirm("此操作将删除该影厅的全部信息").then(res=>{
                let id = this.cinema[index].theaterId;
                this.$store.dispatch("DEL_CINEMA_BYID",id).then(res=>{
                    this.$pointTip(res.msg);
                })
            }).catch(e=>{
                console.log(e);
            });
        },
        updCinema(index){
            const id = this.cinema[index].theaterId;
            let item = this.cinema[index];
            this.actionType = "updateCinema";
            this.visible = true;
            this.title = "修改";
            this.baseVal = id;
            this.listArr = [
                { name: "影厅名称", ref: "theaterName", type: "text", content: item.theaterName },
                { name: "影厅地点", ref: "location", type: "text" , content: item.theaterLocation },
            ];
        }
    }
}
</script>

<style lang="less" scoped>
    .CinemaName{
        height: calc(100% - 75px - 43px);
        &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-btn{
                padding: 10px 20px 10px 30px;
                background-color: #00843e;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background-color: #0A904B;
                }
            }
            .content-btn{
                float: left;
                background-image: url('../assets/add.png');
                background-repeat: no-repeat;
                background-position: 8px 13px;
            }
            &-main{
                margin-top: 50px;
                height: calc(100% - 50px);
                border: 1px solid #DBD9E1;
                background-color: #fff;
                &-title{
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    font-weight: bold;
                    border-bottom: 1px solid #DBD9E1;
                }
                &-id{
                    padding: 0 20px 0 10px;
                    text-align: center;
                }
                &-name{
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 200px;
                    text-align: center;
                }
                &-location{
                    width: 200px;
                    padding: 0 20px 0 10px;
                    text-align: center;
                }
                &-action{
                    width: 190px;
                    text-align: center;
                    &-mor{
                        color: #2B985E;
                        border-color: #2B985E;
                        &:hover{
                            background-color: #2B985E;
                            color: #fff;
                        }
                    }
                    &-del{
                        color: #FE990B;
                        border-color: #FE990B;
                        &:hover{
                            color: #fff;
                            background-color: #FE990B;
                        }
                    }
                    &-upd{
                        color: #F23E47;
                        border-color: #F23E47;
                        &:hover{
                            color: #fff;
                            background-color: #F23E47;
                        }
                    }
                    .action-btn{
                        padding: 2px 5px;
                        cursor: pointer;
                        margin-right: 10px;
                        border: 1px solid;
                        text-decoration: none;
                    }
                }
                &-list{
                    padding: 5px;
                    height: calc(~'100% - 50px');
                    overflow-x: hidden;
                    overflow-y: auto;
                    box-sizing: border-box;
                    &::-webkit-scrollbar{
                        width: 5px;
                    }
                    &::-webkit-scrollbar-thumb{
                        border-radius: 5px;
                        background: #D2D6D4;
                    }
                    &::-webkit-scrollbar-track{
                        border-radius: 5px;
                        background-color: #F6F5FA;
                    }
                    &-item{
                        display: flex;
                        height: 50px;
                        line-height: 50px;
                        &:nth-child(even){
                            background-color: #FAFAFA;
                        }
                        &:hover{
                            background-color: #FAFAFA;
                        }
                    }
                }
            }
        }
    }
</style>