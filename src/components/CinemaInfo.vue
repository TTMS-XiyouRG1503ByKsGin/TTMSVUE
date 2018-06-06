<template>
    <div class="CinemaInfo">
        <div class="CinemaInfo-content">
            <div class="CinemaInfo-content-header">
                <input type="text" autofocus="autofocus" class="CinemaInfo-content-header-input" placeholder="输入影厅ID" ref="query" />
                <button class="CinemaInfo-content-header-btn" @click="queryById">查 询</button>
                <div class="CinemaInfo-content-header-tip">
                    <span class="CinemaInfo-content-header-tip-cor"></span>
                    <span>正常</span>
                    <span class="CinemaInfo-content-header-tip-err"></span>
                    <span>损坏</span>
                </div>
            </div>
            <div v-if="cinemaMore.length" class="CinemaInfo-content-main" ref="main">
                <p>屏 幕</p>
                <div class="CinemaInfo-content-main-seat" ref="seat">
                    <div ref="item" class="CinemaInfo-content-main-seat-item" v-for="(item, index) in cinemaMore" :key="index" v-on:mouseover="(e)=>{computedSite(item,e)}" v-on:mouseout="(e)=>{removeSite(item,e)}" @click="()=>{updateSeatStatus(item)}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    name: 'cinemaInfo',
    data(){
        return{

        }
    },
    created(){
        const id = this.$route.query.id;
        if(id){
            this.getCinemaMoreById(id);
        }
    },
    updated(){
        const id = this.$route.query.id;
        this.$nextTick(() => {
            if(id){
                this.$refs.query.value = id;
            }
            const count = this.$route.query.count || 12;
            const row = this.$route.query.row || 12;
            this.layout(count,row);
            window.onresize = () => {
                this.layout(count,row);
            }
        })
    },
    computed: {
        ...mapState({
            cinemaMore(state){
                return state.manger.cinemaMore
            }
        })
    },
    beforeDestroy(){
        if(this.cinemaMore.length){
            this.clearCinemaMore();
        }    
    },
    methods:{
        ...mapMutations(["clearCinemaMore"]),
        getCinemaMoreById(id){
            this.$store.dispatch("GETCINEMAMOREBYID", id).then(res=>{
                this.$pointTip(res.msg);
            });
        },
        layout(count ,row){
            // this.$nextTick(() => {
            if(this.cinemaMore.length){
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
                let arr = this.$refs.item;
                arr.forEach((i,index)=>{
                    if(this.cinemaMore[index].status){
                        i.style.backgroundColor = "#00843E";
                    }else{
                        i.style.backgroundColor = '#000';
                    }
                })
            }
            // })
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
            this.getCinemaMoreById(id);
        },
        updateSeatStatus(item){
            let obj = {
                theaterId: item.theaterId,
                seatId: item.seatId,
                status: !item.status,
            }
            this.$store.dispatch("UPDATE_CINEMASEAT_BYID",obj).then(res=>{
                this.$pointTip(res.msg);
            });
        }
    }
}
</script>

<style lang="less" scoped>
    .CinemaInfo{
        height: calc(100% - 75px - 43px);
        &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-header{
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
                    height: 100%;
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