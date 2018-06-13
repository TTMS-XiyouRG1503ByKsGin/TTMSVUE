<template>
    <div class="PlanName">
        <div class="PlanName-content">
            <div class="PlanName-content-btn content-btn" @click="addPlan">添加演出计划</div>
            <div class="PlanName-content-main">
                <div class="PlanName-content-main-title">
                    <span class="PlanName-content-main-id">演出计划ID</span>
                    <span class="PlanName-content-main-cinema">所在影厅名称</span>
                    <span class="PlanName-content-main-play">演出剧目</span>
                    <span class="PlanName-content-main-time">演出时间</span>
                    <span class="PlanName-content-main-price">价格</span>
                    <span class="PlanName-content-main-action">操作</span>
                </div>
                <div class="PlanName-content-main-list">
                    <div v-if="plan.length !== 0" class="PlanName-content-main-list-item" v-for="(item, index) in plan" :key="index">
                        <span class="PlanName-content-main-id">{{item.goodId}}</span>
                        <span class="PlanName-content-main-cinema">{{item.threateName}}</span>
                        <span class="PlanName-content-main-play">{{item.programme}}</span>
                        <span class="PlanName-content-main-time">{{item.playDate | filterDate}} {{item.performance}}</span>
                        <span class="PlanName-content-main-price">{{item.price}}</span>
                        <span class="PlanName-content-main-action">
                            <a href="javascript:void(0)" class="PlanName-content-main-action-buy action-btn" @click="buyTicket(index)">购买</a>
                            <a href="javascript:void(0)" class="PlanName-content-main-action-del action-btn" @click="delPlan(index)">删除</a>
                            <a href="javascript:void(0)" class="PlanName-content-main-action-upd action-btn" @click="updPlan(index)">修改</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <ActionBox :actionType="actionType" :visible="visible" :title="title" :baseVal="baseVal" :listArr="listArr" @changeVisible="changeVisible"></ActionBox>
    </div>
</template>

<script>
import ActionBox from './ActionBox.vue';
export default {
    name: 'planName',
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
        this.$store.dispatch("GET_ALL_PLAN");
    },
    computed: {
        plan(){
            return this.$store.state.manger.plan;
        }
    },
    methods: {
        addPlan(){
            this.actionType = "addPlan";
            this.visible = true;
            this.title = "添加";
            this.listArr = [
                { name: "影厅ID", ref: "theaterId", type: "text" },
                { name: "剧目ID", ref: "programmeId", type: "text" },
                { name: "演出日期", ref: "playDate", type: "text" },
                { name: "演出时间", ref: "performance", type: "text" },
                { name: "票价", ref: "price", type: "text" }
            ];
        },
        delPlan(index){
            this.$confirm("此操作将删除该演出计划").then(()=>{
                let id = this.plan[index].goodId;
                this.$store.dispatch("DEL_PLAN_BYID", id).then(res=>{
                    this.$pointTip(res.msg);
                });
            }).catch(e=>{
                console.log(e);
            });
        },
        updPlan(index){
            let item = this.plan[index];
            this.actionType = "updatePlan";
            this.visible = true;
            this.baseVal = item.goodId;
            this.title = "修改";
            this.listArr = [
                { name: "演出日期", ref: "playDate", type: "text", content: item.playDate },
                { name: "演出场次", ref: "performance", type: "text", content: item.performance },
                { name: "票价", ref: "price", type: "text", content: item.price }
            ];
        },
        changeVisible(visible){
            this.visible = visible;
        },
        buyTicket(index){
            let id = this.plan[index].goodId;
            this.$router.push(`/admin/plan/ticket?id=${id}`);
        }
    },
    filters:{
        filterDate(date){
            let reg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
            let str = reg.exec(date)[0];
            return str;
        }
    }
}
</script>

<style lang="less" scoped>
    .PlanName{
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
                    min-width: 100px;
                }
                &-cinema{
                    padding: 0 10px;
                    width: 150px;
                    text-align: center;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                &-play{
                    // flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 200px;
                    text-align: center;
                }
                &-time{
                    flex: 1;
                    padding: 0 10px;
                    width: 130px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    text-align: center;
                }
                &-price{
                    padding: 0 10px;
                    width: 60px;
                    text-align: center;
                }
                &-action{
                    width: 190px;
                    text-align: center;
                    &-buy{
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