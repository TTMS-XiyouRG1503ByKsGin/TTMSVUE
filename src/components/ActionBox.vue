<template>
    <div class="ActionBox" v-show="visible">
        <div class="ActionBox-content">
            <div class="ActionBox-headr">
                <span class="ActionBox-header-title">{{title}}</span>
                <span class="ActionBox-header-close" @click="handleAction('取消')">X</span>
            </div>
            <div class="ActionBox-main">
                <dl v-for="(item, index) in listArr" :key="index" class="ActionBox-main-list">
                    <dt class="ActionBox-main-name">{{ item.name }}</dt>
                    <dt>
                        <input v-if="item.type==='text' || item.type==='file' || item.type ==='password'" :type="item.type" class="ActionBox-main-input" :ref="item.ref">
                        <textarea v-else-if="item.type==='textarea'" class="ActionBox-main-input" cols="30" rows="3" :ref="item.ref"></textarea>
                        <select v-else-if="item.type ==='select'" class="ActionBox-main-input" :ref="item.ref">
                            <option v-for="(t, index) in item.option" :key="index" :data-id="t.id">{{t.name}}</option>
                        </select>
                    </dt>
                </dl>
            </div>
            <div class="ActionBox-btn">
                <span class="ActionBox-btn-confirm" @click="handleAction('确认')">确认</span>
                <span class="ActionBox-btn-cancel" @click="handleAction('取消')">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        actionType:{
            type: String
        },
        visible:{
            type: Boolean,
            default: false
        },
        title:{
            type: String,
            default: ""
        },
        baseVal:{
            type: Number
        },
        listArr:{
            type: Array,
            default: [
                {name: "影厅id", }
            ]
        },

    },
    updated(){
        if(this.visible === true){
            if(this.actionType.substr(0,6) === "update"){
                this.$nextTick(()=>{
                    let refArr = Object.entries(this.$refs);
                    refArr.forEach((item,index)=>{
                        let arrKey = item[0];
                        item[1][0].value = this.listArr[index].content;
                    });
                })
            }
        }
        if(this.visible === false){
            this.$nextTick(()=>{
                let refArr = Object.entries(this.$refs);
                refArr.forEach((item,index)=>{
                    item[1][0].value = "";
                });
            });
        }
    },
    methods:{
        handleAction(action){
            this.$nextTick(()=>{
                if(action === '确认'){
                    let refArr = Object.entries(this.$refs);
                    let obj = {};
                    refArr.forEach((item,index) => {
                        let arrKey = item[0];
                        let arrValue;
                        if(item[1][0].type === "select-one"){
                            let i = item[1][0].selectedIndex;
                            arrValue = item[1][0][i].getAttribute("data-id");
                        }else{
                            if(arrKey === "file"){
                                arrValue = item[1][0].files[0];
                            }else{
                                arrValue = item[1][0].value;
                            }
                        }
                        obj[arrKey] = arrValue;
                    });
                    switch(this.actionType){
                        case "addCinema":
                            this.$store.dispatch("ADD_CINEMA",obj).then(res=>{
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "updateCinema":
                            obj["theaterId"] = this.baseVal;
                            this.$store.dispatch("UPD_CINEMA_BYID", obj).then(res=>{
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "addPlay":
                            this.$store.dispatch("ADD_PLAY",obj).then(res=>{
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "updatePlay":
                            obj["programmeId"] = this.baseVal;
                            this.$store.dispatch("UPD_PLAY_BYID", obj).then(res=>{
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "addPlan":
                            this.$store.dispatch("ADD_PLAN", obj).then(res => {
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "updatePlan":
                            obj["goodId"] = this.baseVal;
                            this.$store.dispatch("UPD_PLAN_BYID",obj).then(res=>{
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "addUser":
                            if(obj.password !== obj.confirmPassword){
                                this.$pointTip("两次密码输入有误");
                                return;
                            }
                            obj["theaterId"] = -1;
                            this.$store.dispatch("ADD_USER", obj).then(res=>{
                                this.$pointTip(res.msg);
                            });
                            break;
                        case "updateUser":
                            obj["userId"] = this.baseVal;
                            this.$store.dispatch("UPD_USER_BYID", obj).then(res=>{
                                this.$pointTip(res);
                            });
                            break;
                        default:
                            break;
                    }

                }
                this.$emit("changeVisible", false);
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .ActionBox{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2000;
        background-color: rgba(0, 0, 0, .3);
        &-content{
            position:fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 450px;
            background-color: #fff;
            padding: 10px 20px;
            z-index: 2001;
            border-radius: 4px;
        }
        &-header{
                &-title{
                    font-size: 18px;
                    color: #303133;
                }
                &-close{
                    float: right;
                    color: #909399;
                    cursor: pointer;
                }
            }
            &-main{
                &-list{
                    width: 100%;
                    dt{
                        text-align: center;
                    }
                }
                &-name{
                    text-align: left !important;
                    color: #303133;
                    margin-bottom: 5px;
                }
                &-input{
                    display: inline-block;
                    border: 1px solid #dcdfe6;
                    background-color: #fff;
                    color: #606266;
                    outline: none;
                    border-radius: 4px;
                    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                    padding: 10px 10px;
                    width: 100%;
                    box-sizing: border-box;
                }
            }
            &-btn{
                text-align: center;
                &-confirm{
                    display: inline-block;
                    padding: 10px 15px;
                    background: #409EFF;
                    border: 1px solid #dcdfe6;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 4px;
                    &:hover{
                        background-color: #71B2F5;
                    }
                }
                &-cancel{
                    display: inline-block;
                    margin-left: 20px;
                    padding: 10px 15px;
                    color: #606266;
                    border: 1px solid #dcdfe6;
                    cursor: pointer;
                    border-radius: 4px;
                    &:hover{
                        color: #409EFF;
                        border-color: #409EFF;
                    }
                }
            }
    }
</style>

