<template>
    <div class="TicketInfo">
        <div class="TicketInfo-content">
            <div class="TicketInfo-content-header">
                <input type="text" autofocus="autofocus" class="TicketInfo-content-header-input" placeholder="输入演出计划ID" ref="query" />
                <button class="TicketInfo-content-header-btn" @click="queryById">查 询</button>
                <div v-if="selectTicket.length" class="TicketInfo-content-header-selectArr">
                    <span v-for="(item, index) in selectTicket" :key="index" @click="cancel(item,index)">{{item.seatRowNumber}}行{{item.seatColNumber}}列</span>
                    <div class="TicketInfo-content-header-selectArr-buy" @click="buyTicket">确认选座</div>
                </div>
                <div class="TicketInfo-content-header-tip">
                    <span class="TicketInfo-content-header-tip-cor"></span>
                    <span>正常</span>
                    <span class="TicketInfo-content-header-tip-err"></span>
                    <span>不可选</span>
                    <span class="TicketInfo-content-header-tip-select"></span>
                    <span>已选</span>
                </div>
            </div>
            <div v-if="ticketMore.length" class="TicketInfo-content-main" ref="main">
                <p>屏 幕</p>
                <div class="TicketInfo-content-main-seat" ref="seat">
                    <div ref="item" class="TicketInfo-content-main-seat-item" v-for="(item, index) in ticketMore" :key="index" v-on:mouseover="(e)=>{computedSite(item,e)}" v-on:mouseout="(e)=>{removeSite(item,e)}" @click="(e)=>{select(item,e)}"></div>
                </div>
            </div>
        </div>
        <ticket-box v-if="visible" :visible="visible" :currentPlan="currentPlan" :selectTicket="selectTicket" @changeVisible="changeVisible" @changeSelect="changeSelect"></ticket-box>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import TicketBox from './TicketBox.vue';
export default {
    name: 'ticketInfo',
    components:{
        TicketBox
    },
    data(){
        return {
            count: 1,
            selectTicket: [],
            isFinish: false,
            visible: false,
            currentPlan: {},
            arr: []
        }
    },
    created(){
        if(!this.plan.length){
            this.$store.dispatch("GET_ALL_PLAN");
        }
        if(!this.cinema.length){
            this.$store.dispatch("GETALLCINEMA");
        }
        const id = this.$route.query.id;
        if(id){
            this.getTicketMoreById(id);
            
        }
    },
    updated(){
        const id = this.$route.query.id;
        let col,row,theaterId;
        this.$nextTick(() => {
            if(id){
                this.$refs.query.value = id;
            }
            // if(this.$refs.query){
                this.plan.forEach((item,index)=>{
                    if(item.goodId == this.$route.query.id){
                        theaterId = item.theaterId;
                        this.currentPlan = item;
                    }
                });
                this.cinema.forEach((item,index)=>{
                    if(item.theaterId == theaterId){
                        col = item.theaterSeatColsCount;
                        row = item.theaterSeatRowsCount;
                    }
                });
                this.layout(col,row);
                window.onresize = () => {
                    this.layout(col,row);
                }
            // }
        });
    },
    computed:{
        ...mapState({
            plan(state){
                return state.manger.plan;
            },
            cinema(state){
                return state.manger.cinema;
            },
            ticketMore(state){
                return state.manger.ticketMore;
            },
        }),
        userId(){
            console.log(this.$store.state)
            return this.$store.state.auth.userInfo.userId; 
        }
    },
    beforeDestroy(){
        if(this.ticketMore.length){
            this.clearTicketMore();
        }  
    },
    methods:{
        ...mapActions(['GETALLCINEMA']),
        ...mapMutations(['clearTicketMore','upd_select_ticket']),
        getTicketMoreById(id){
            this.$store.dispatch("GET_TICKETMORE_BYID",id).then(res=>{
                this.$pointTip(res.msg);
            });
        },
        layout(count ,row){
            if(this.ticketMore.length){
                let mainWidth = this.$refs.main.clientWidth;
                let margin = 2 * 15 * count;
                let width = 30 * count;
                if(margin + width <= mainWidth){
                    this.$refs.seat.style.width = margin + width + "px";
                }else{
                    this.$refs.seat.style.width = mainWidth + "px";
                    let arr = this.$refs.item;
                    arr.forEach((i,index)=>{
                        let x = (mainWidth - margin) / count;
                        i.style.width = x + "px";
                        i.style.height = x + "px";
                    })
                }
                if(this.count === 1 || this.isFinish === true){
                    this.count = this.count+1;
                    let arr = this.$refs.item;
                    arr.forEach((i,index)=>{
                        if(this.ticketMore[index].status == 1){
                            i.style.backgroundColor = "#00843E";
                        }else if(this.ticketMore[index].status == 2 || this.ticketMore[index].status== 0){
                            i.style.backgroundColor = '#000';
                        }else{
                            i.style.backgroundColor = 'aqua';
                        }
                    });
                }
            }
        },
        computedSite(item,e){
            let attr = `${item.seatRowNumber}行${item.seatColNumber}列`;
            e.target.setAttribute("data-attr", attr);
            e.target.classList.add("hover");
        },
        removeSite(item,e){
            e.target.removeAttribute("data-attr");
            e.target.classList.remove("hover");
        },
        queryById(){
            let id = this.$refs.query.value.trim();
            if(id === ""){
                this.$pointTip("查询影厅Id不能为空~");
                return;
            }
            this.getTicketMoreById(id);
            this.$router.push(`/admin/plan/ticket?id=${id}`);
            this.count = 1;
        },
        select(item,e){
            this.isFinish = false;
            //最多选5个
            let flag = 0;
            let arr = this.selectTicket;
            if(arr.length >= 5){
                this.$pointTip("最多不能超过5个");
                return;
            }
            arr.forEach((i,index)=>{
                if(i === item){
                    flag = 1;
                }
            });
            if(item.status !== 1){
                return;
            }
            if(flag === 1){
                return;
            }
            //改变颜色
            e.target.style.backgroundColor = "aqua";
            this.selectTicket = [...arr, item];
        },
        cancel(t,i){
            //恢复颜色
            let arr = this.selectTicket;
            arr = arr.filter((item,index)=>{
                return index !== i;
            });
            this.selectTicket = arr;
            this.ticketMore.forEach((item,index)=>{
                if(t === item){
                    this.$refs.item[index].style.backgroundColor = '#00843E';
                }
            });
        },
        buyTicket(){
            this.selectTicket.forEach((item,index)=>{
                let id = item.id;
                let goodId = this.$route.query.id;
                let userId = this.userId;
                let obj = {id,goodId,userId};
                this.$store.dispatch("SELECT_TICKET",obj).then(res=>{
                    if(res.result === 200){
                        this.isFinish = true;
                        this.visible = true;
                    }
                    this.$pointTip(res.msg);
                });
            })
        },
        changeVisible(visible){
            this.visible = visible;
        },
        changeSelect(arr){
            this.selectTicket = arr;
        }
    }
}
</script>
<style lang="less" scoped>
    .TicketInfo{
        height: calc(~'100% - 75px - 43px');
        &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-header{
                position: relative;
                padding: 5px;
                line-height: 30px;
                &-input{
                    width: 250px;
                    height: 30px;
                    padding: 0 5px;
                    border: 2px solid #00843E;
                    outline: 0;
                    box-sizing: border-box;
                }
                &-btn{
                    margin-left: 10px;
                    display: inline-block;
                    padding: 8px 15px;
                    background-color: #00843E;
                    color: #fff;
                    border-radius: 5px;
                    cursor: pointer;
                    border: 0;
                    font-size: 16px;
                    outline: 0;
                    &:hover{
                        background-color: #0A904B;
                    }
                }
                &-selectArr{
                    display: inline-block;
                    margin-left: 5px;
                    span{
                        cursor: pointer;
                        display: inline-block;
                        padding: 2px 20px 2px 5px;
                        margin-right: 10px;
                        border-radius: 4px;
                        // border: 1px solid #0A904B;
                        color: #fff;
                        background-color: #0A904B;
                        font-size: 12px;
                        background-image: url("../assets/del.png");
                        background-repeat: no-repeat;
                        background-position: 43px 7px;
                        background-size: 20px;
                    }
                    &-buy{
                        position: absolute;
                        top: 0;
                        right: 180px;
                        display: inline-block;
                        padding: 5px 15px;
                        color: #fff;
                        background-color: #0A904B;
                        cursor: pointer;
                        border-radius: 4px;
                    }
                }
                &-tip{
                    float: right;
                    &-cor{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #00843E;
                    }
                    &-err{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #000;
                    }
                    &-select{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: aqua;
                    }
                }
            }
            &-main{
                height: calc(~'100% - 30px - 20px');
                border: 1px solid #DBD9E1;
                padding: 5px;
                box-sizing: border-box;
                overflow-x: hidden;
                overflow-y: auto;
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
                P{
                    text-align: center;
                    font-weight: bold;
                }
                &-seat{
                    // height: 100%;
                    margin: 0 auto;
                    &-item{
                        position: relative;
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        margin: 15px;
                        cursor: pointer;
                        // background-color: #00843E;
                    }
                }
            }
        }
    }
    .hover{
        &::after{
            display: inline-block;
            content: attr(data-attr);
            position: absolute;
            left: -10px;
            margin-top: 32px;
            border: 1px solid #666;
            border-radius: 2px;
            width: 60px;
            font-size: 12px;
            text-align: center;
        }
    }
    .cor{
        background-color: #00843E;
    }
    .err{
        background-color: #000;
    }

</style>
