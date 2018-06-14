<template>
    <div class="Unfinished">
        <div class="Unfinished-content">
            <div class="Unfinished-content-main">
                <div class="Unfinished-content-main-title">
                    <span class="Unfinished-content-main-name">剧目名称</span>
                    <span class="Unfinished-content-main-location">所在影厅</span>
                    <span class="Unfinished-content-main-seat">座位</span>
                    <span class="Unfinished-content-main-price">价格</span>
                    <span class="Unfinished-content-main-time">演出时间</span>
                    <span class="Unfinished-content-main-action">操作</span>
                </div>
                <div class="Unfinished-content-main-list" v-if="unfinished.length">
                    <div class="Unfinished-content-main-list-item " v-for="(item, index) in unfinished" :key="item.theaterId">
                        <span class="Unfinished-content-main-name">{{ item.name }}</span>
                        <span class="Unfinished-content-main-location">{{ item.theaterName }}</span>
                        <span class="Unfinished-content-main-seat">{{item.seatRowNumber}}行{{item.seatColNumber}}列</span>
                        <span class="Unfinished-content-main-price">{{ item.price }}</span>
                        <span class="Unfinished-content-main-time">{{ item.date | filterTime }} {{item.performance}}</span>
                        <span class="Unfinished-content-main-action">
                            <a href="javascript:void(0)" class="Unfinished-content-main-action-mor action-btn" @click="() =>{buyTicket(item,index)}">支付</a>
                        </span>
                    </div>
                </div>
                <div class="Unfinished-content-main-none" v-else>
                    暂无数据~
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'unfinished',
    data(){
        return {

        }
    },
    created(){
        this.$store.dispatch("GET_ALL_UNFINISHED",this.userId);
    },
    computed:{
        userId(){
            return this.$store.state.auth.userInfo.userId;
        },
        unfinished(){
            return this.$store.state.manger.unfinished;
        }
    },
    methods:{
        buyTicket(item,index){
            this.$confirm("是否支付该未完成订单").then(()=>{
                let o = {ticketId: item.id, userId: this.userId,};
                this.$store.dispatch("RE_PAY_TICKET",o).then(res=>{
                    this.$pointTip(res.msg);
                });
            })
        }
    },
    filters:{
        filterTime(time){
            let arr = time.split("T");
            let date = arr[0];
            let t = arr[1].substr(0, 5);
            return date + " ";
        }
    }
}
</script>
<style lang="less" scoped>
    .Unfinished{
        height: calc(100% - 75px - 43px);
         &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-main{
                // margin-top: 50px;
                // height: calc(100% - 50px);
                position: relative;
                height: 100%;
                border: 1px solid #DBD9E1;
                background-color: #fff;
                &-title{
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    font-weight: bold;
                    border-bottom: 1px solid #DBD9E1;
                    overflow: hidden;
                    span{
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
                &-name{
                    width: 150px;
                    padding: 0 20px;
                    text-align: center;
                }
                &-location{
                    padding: 0 20px;
                    width: 200px;
                    text-align: center;
                }
                &-seat{
                    width: 130px;
                    padding:  0 20px;
                    text-align: center;
                }
                &-price{
                    padding: 0 20px;
                    text-align: center;
                    width: 80px;
                }
                &-time{
                    padding: 0 20px;
                    text-align: center;
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
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
                        span{
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        &:nth-child(even){
                            background-color: #FAFAFA;
                        }
                        &:hover{
                            background-color: #FAFAFA;
                        }
                    }
                }
                &-none{
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                }
            }
        }
    }
</style>
