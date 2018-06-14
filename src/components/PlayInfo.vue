<template>
    <div class="PlayInfo">
       <div class="PlayInfo-content">
            <div class="PlayInfo-content-addbtn content-btn" @click="addPlay">添加剧目</div>
            <!-- <div class="PlayInfo-content-updbtn content-btn">修改剧目</div>
            <div class="PlayInfo-content-delbtn content-btn">删除剧目</div> -->
            <div class="PlayInfo-content-main">
                <div v-for="(item, index) in play" :key="index" class="PlayInfo-content-main-item">
                    <img :src="picUrl + item.programmeImagePath" class="PlayInfo-content-main-item-img"/>
                    <div class="PlayInfo-content-main-item-info">
                        <div class="PlayInfo-content-main-item-info-id"><span>ID：</span>{{item.programmeId}}</div>
                        <div class="PlayInfo-content-main-item-info-name"><span>名称：</span>{{item.programmeName}}</div>
                        <div class="PlayInfo-content-main-item-info-duration"><span>时长：</span>{{item.programmeDruation}}分钟</div>
                        <div class="PlayInfo-content-main-item-info-tag"><span>分类：</span>{{item.programmeTags}}</div>
                        <div class="PlayInfo-content-main-item-info-profile"><span>简介：</span>{{item.programmeProfile}}</div>
                    </div>
                    <div class="PlayInfo-content-main-item-action">
                        <div class="PlayInfo-content-main-item-action-upd action-btn" @click="updPlay(index)">修改</div>
                        <div class="PlayInfo-content-main-item-action-del action-btn" @click="delPlay(index)">删除</div>
                    </div>
                </div>
            </div>
        </div>
        <ActionBox :actionType="actionType" :visible="visible" :title="title" :baseVal="baseVal" :listArr="listArr" @changeVisible="changeVisible"></ActionBox>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ActionBox from './ActionBox.vue';

export default {
    name: 'playInfo',
    components:{
        ActionBox,
    },
    data(){
        return{
            actionType: "",
            visible: false,
            title: "",
            baseVal: -1,
            listArr: [],
            picUrl: "http://123.206.82.241:8090/"
        }
    },
    created(){
        this.GET_ALL_PLAY().then(res=>{
        });
    },
    computed: {
        ...mapState({
            play(state){
                return state.manger.play;
            }
        })
    },
    methods:{
        ...mapActions(["GET_ALL_PLAY"]),
        delPlay(index){
            this.$confirm("此操作将删除剧目信息").then(()=>{
                let id = this.play[index].programmeId;
                this.$store.dispatch("DEL_PLAY_BYID",id).then(res=>{
                    this.$pointTip(res.msg);
                });
            }).catch(e=>{   
                console.log(e);
            })
        },
        updPlay(index){
            let item = this.play[index];
            this.actionType = "updatePlay";
            this.visible = true;
            this.title  = "修改";
            this.baseVal = item.programmeId;
            this.listArr = [
                { name: "剧目名称", ref: "programmeName", type: "text", content: item.programmeName },
                { name: "剧目分类", ref: "programmeTags", type: "text", content: item.programmeTags },
                { name: "剧目时长", ref: "programmeDruation", type: "text", content: item.programmeDruation },
                { name: "剧目封面", ref: "file", type: "file", content: '' },
                { name: "剧目简介", ref: "programmeProfile", type: "textarea", content: item.programmeProfile }
            ]
        },
        addPlay(){
            this.actionType = "addPlay";
            this.visible = true;
            this.title  = "添加";
            this.listArr = [
                { name: "剧目名称", ref: "programmeName", type: "text" },
                { name: "剧目分类", ref: "programmeTags", type: "text" },
                { name: "剧目时长", ref: "programmeDruation", type: "text" },
                { name: "剧目封面", ref: "file", type: "file" },
                { name: "剧目简介", ref: "programmeProfile", type: "textarea" },
            ]
        },
        changeVisible(visible){
            this.visible = visible;
        },
    }
}
</script>

<style lang="less" scoped>
    .PlayInfo{
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
            &-updbtn{
                background-image: url('../assets/upd.png');
                background-position: 5px 10px;
                background-size: 20%;
            }
            &-delbtn{
                background-image: url('../assets/del.png');
                background-position: 0 8px;
                background-size: 25%;
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
                // background-color: #fff;
                background-color: #F6F5FA;
                padding: 5px;
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
                    padding: 5px;
                    width: 100%;
                    height: 140px;
                    border-radius: 4px;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    background: #fff;
                    overflow: hidden;
                    transition: transform .5s;
                    &:hover{
                        transform: scale(0.99);
                    }
                    &-img{
                        width: 100px;
                        height: 100%;
                    }
                    &-info{
                        flex: 1;
                        position: relative;
                        margin-left: 20px;
                        width: calc(~"100% - 100px - 20px");
                        font-size: 14px;
                        &-id{
                           color: #777;
                            span{
                                color: #000;
                            } 
                        }
                        &-name{
                            color: #777;
                            span{
                                color: #000;
                            }
                        }
                        &-duration{
                            color: #777;
                            span{
                                color: #000;
                            }
                        }
                        &-tag{
                            color: #777;
                            span{
                                color: #000;
                            }
                        }
                        &-profile{
                            color: #777;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                            span{
                                color: #000;
                            }
                        }
                    }
                    &-action{
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                        &-upd{
                            color: #FE990B;
                            border-color: #FE990B;
                            &:hover{
                                color: #fff;
                                background-color: #FE990B;
                            }
                        }
                        &-del{
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
                }
            }
        }

    }
</style>