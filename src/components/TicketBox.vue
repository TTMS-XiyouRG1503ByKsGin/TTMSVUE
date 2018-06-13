<template>
    <div class="TicketBox">
        <div class="TicketBox-content">
            <div class="TicketBox-content-header">
                <span class="TicketBox-content-header-title">提示</span>
                <span class="TicketBox-content-header-close" @click="closeBox">X</span>
            </div>
            <div class="TicketBox-content-main">
                <div class="TicketBox-content-main-top">
                    <div class="TicketBox-content-main-top-img">
                        <img v-if="currentPlay" :src="picUrl + this.currentPlay.programmeImagePath" alt="" />
                    </div>
                    <div class="TicketBox-content-main-top-info">
                        <div class="TicketBox-content-main-top-info-name">{{currentPlay.programmeName}}</div>
                        <div class="TicketBox-content-main-top-info-tag">类型：<span>{{currentPlay.programmeTags}}</span></div>
                        <div class="TicketBox-content-main-top-info-duration">时长：<span>{{currentPlay.programmeDruation}}分钟</span></div>
                    </div>
                </div>
                <div class="TicketBox-content-main-center">
                    <div>影厅：<span>{{currentPlan.threateName}}</span></div>
                    <div>场次：<span>{{currentPlan.playDate | filterDate}} {{currentPlan.performance}}</span></div>
                    <div>票价：<span>￥{{currentPlan.price}}/张</span></div>
                    <div>座位：<span class="TicketBox-content-main-center-ticket" v-for="(item, index) in selectTicket" :key="index">{{item.seatRowNumber}}行{{item.seatColNumber}}列</span></div>
                </div>
                <div class="TicketBox-content-main-bottom">总价：<span>￥</span><span>{{totalPrice}}</span></div>
                <div class="TicketBox-content-main-btn" @click="confirmBuy">确认支付</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            currentPlay: {},
            picUrl: "http://123.206.82.241:8090/"
        }
    },
    props:{
        visible:{
            type: Boolean,
            required: true
        },
        selectTicket:{
            type: Array,
            required: true
        },
        currentPlan:{
            type: Object,
            required: true
        },
    },
    created(){
        let programmeId = this.currentPlan.programmeId;
        if(!this.play.length){
            this.$store.dispatch("GET_ALL_PLAY").then(res=>{
                this.play.forEach((item,index)=>{
                    if(item.programmeId === programmeId){
                        this.currentPlay = item;
                    }
                });
            });
        }else{
            this.play.forEach((item,index)=>{
                if(item.programmeId === programmeId){
                    this.currentPlay = item;
                }
            });
        }

    },
    computed:{
        play(){
            return this.$store.state.manger.play;
        },
        totalPrice(){
            return this.currentPlan.price * this.selectTicket.length;
        },
        userId(){
            return this.$store.state.auth.userInfo.userId;
        }
    },
    methods:{
        closeBox(){
            this.changeVisible(false);
            this.$emit("changeSelect",[]);
        },
        changeVisible(visible){
            this.$emit("changeVisible",visible);
        },
        confirmBuy(){
            this.selectTicket.forEach((item,index)=>{
                let o = {ticketId: item.id, userId: this.userId, goodId:this.$route.query.id};
                this.$store.dispatch("PAY_TICKET",o).then(res=>{
                    this.$pointTip(res.msg);
                    if(res.result===200){
                        this.changeVisible(false);
                        this.$emit("changeSelect",[]);
                    }
                });
            })
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
    .TicketBox{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2000;
        background-color: rgba(0, 0, 0, .2);
        &-content{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 330px;
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
            overflow: hidden;
            &-header{
                padding-bottom: 20px;
                 &-title{
                    font-weight: bold;
                }
                &-close{
                    float: right;
                    cursor: pointer;
                }
            }
            &-main{
                &-top{
                    overflow: hidden;
                    margin-bottom: 20px;
                    &-img{
                        float: left;
                        width: 110px;
                        height: 158px;
                        border: 2px solid #fff;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &-info{
                        margin-left: 140px;
                        &-name{
                            margin-bottom: 10px;
                            font-size: 20px;
                            font-weight: 700;
                            color: #333;
                        }
                        &-tag{
                            font-size: 12px;
                            color: #999;
                            span{
                                color: #151515;
                            }
                        }
                        &-duration{
                            font-size: 12px;
                            color: #999;
                            span{
                                color: #151515;
                            }
                        }
                    }
                }
                &-center{
                    padding: 0 0 10px;
                    div{
                        font-size: 14px;
                        margin-bottom: 5px;
                        color: #999;
                        span{
                            color: #333;
                        }
                    }
                    &-ticket{
                        display: inline-block;
                        color: #f03d37 !important;
                        font-size: 12px !important;
                        width: 60px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        margin: 0 12px 10px 0;
                        background: url('../assets/ticket.png') no-repeat;
                    }
                }
                &-bottom{
                    color: #333;
                    font-size: 14px;
                    span{
                        color: #f03d37;
                        &:nth-child(1){
                            font-size: 14px;
                        }
                        &:nth-child(2){
                            font-size: 24px;
                        }
                    }
                }
                &-btn{
                    margin: 10px 0;
                    cursor: pointer;
                    padding: 10px 0;
                    background-color: #f03d37;
                    color: #fff;
                    font-size: 16px;
                    border-radius: 20px;
                    text-align: center;
                }
            }
        }
    }
</style>

