<template>
    <div class="UserName">
        <div class="UserName-content">
            <div class="UserName-content-addbtn content-btn" @click="addUser">添加用户</div>
            <div class="UserName-content-main">
                <div class="UserName-content-main-title">
                    <span class="UserName-content-main-id">用户ID</span>
                    <span class="UserName-content-main-name">用户名</span>
                    <span class="UserName-content-main-account">账号</span>
                    <span class="UserName-content-main-sex">性别</span>
                    <span class="UserName-content-main-level">用户权限</span>
                    <span class="UserName-content-main-phone">联系方式</span>
                    <span class="UserName-content-main-lastTime">上次登录时间</span>
                    <span class="UserName-content-main-action">操作</span>
                </div>
                <div class="UserName-content-main-list">
                    <div class="UserName-content-main-list-item" v-for="(item, index) in user" :key="index">
                        <span class="UserName-content-main-id">{{ item.userId }}</span>
                        <span class="UserName-content-main-name">{{ item.userName }}</span>
                        <span class="UserName-content-main-account">{{ item.userAccount }}</span>
                        <span class="UserName-content-main-sex">{{ item.userSex }}</span>
                        <span class="UserName-content-main-level">{{ item.userLevel }}</span>
                        <span class="UserName-content-main-phone">{{ item.userTel }}</span>
                        <span class="UserName-content-main-lastTime">{{ item.userLastSignInTime | filterTime }}</span>
                        <span class="UserName-content-main-action">
                            <a href="javascript:void(0)" class="UserName-content-main-action-del action-btn" @click="delUser(index)">删除</a>
                            <a href="javascript:void(0)" class="UserName-content-main-action-upd action-btn" @click="updUser(item,index)">修改</a>
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
    name: 'userName',
    components:{
        ActionBox,
    },
    data(){
        return {
            actionType: "",
            visible: false,
            title: "",
            baseVal: -1,
            listArr: [],
        }
    },
    created(){
        this.$store.dispatch("GET_ALL_USER");
    },
    computed:{
        user(){
            return this.$store.state.manger.user;
        },
    },
    methods:{
        addUser(){
            this.actionType = "addUser";
            this.visible = true;
            this.title = "添加";
            this.listArr = [
                { name: "账号", ref: "account", type: "text" },
                { name: "密码", ref: "password", type: "password" },
                { name: "确认密码", ref: "confirmPassword", type: "password" },
                { name: "用户名", ref: "name", type: "text" },
                { name: "性别", ref: "sex", type: "text" },
                { name: "权限", ref: "level", type: "text" },
                { name: "联系方式", ref: "tel", type: "text" }
            ];
        },
        updUser(item,index){
            this.baseVal = item.userId;
            this.actionType = "updateUser";
            this.visible = true;
            this.title = "修改";
            this.listArr = [
                { name: "权限", ref: "level", type: "text", content: item.userLevel },
                { name: "联系方式", ref: "tel", type: "text", content: item.userTel },
                { name: "密码", ref: "password", type: "password", content: item.userPassword },
            ];
        },
        delUser(index){
            this.$confirm("此操作将删除该用户的全部信息").then(res=>{
                let id = this.user[index].userId;
                this.$store.dispatch("DEL_USER_BYID",id).then(res=>{
                    this.$pointTip(res.msg);
                })
            }).catch(e=>{
                console.log(e);
            });
        },
        changeVisible(visible){
            this.visible = visible;
        },
    },
    filters:{
        filterTime(time){
            let arr = time.split("T");
            let date = arr[0];
            let t = arr[1].substr(0, 5);
            return date + " " + t;
        }
    }
}
</script>
<style lang="less" scoped>
    .UserName{
        height: calc(100% - 75px - 43px);
        &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-addbtn{
                background-image: url('../assets/add.png');
                background-position: 8px 13px;
            }
            .content-btn{
                float: left;
                padding: 10px 20px 10px 30px;
                background-color: #00843e;
                color: #fff;
                border-radius: 5px;
                margin-right: 10px;
                cursor: pointer;
                background-repeat: no-repeat;
                &:hover{
                    background-color: #0A904B;
                }
            }
            &-main{
                margin-top: 50px;
                height: calc(100% - 50px);
                border: 1px solid #DBD9E1;
                background-color: #fff;
                // padding: 5px;
                box-sizing: border-box;
                &-title{
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    font-weight: bold;
                    border-bottom: 1px solid #DBD9E1;
                    overflow: hidden;
                }
                &-id{
                    padding: 0 20px 0 10px;
                    width: 60px;
                    text-align: center;
                }
                &-name{
                    width: 60px;
                    padding: 0 20px;
                    text-align: center;
                }
                &-account{
                    text-align: center;
                    width: 60px;
                    padding:  0 20px;
                }
                &-sex{
                    text-align: center;
                    width: 60px;
                    padding: 0 20px;
                }
                &-level{
                    text-align: center;
                    width: 80px;
                    padding:  0 20px;
                }
                &-phone{
                    text-align: center;
                    flex: 1;
                    padding:  0 10px;
                }
                &-lastTime{
                    padding:  0 20px;
                    flex: 1;
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
                        overflow: hidden;
                        flex-wrap: nowrap;
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
