<template>
    <div class="Finished">
        <div class="Finished-content">
            <div class="Finished-content-header">
                <select class="Finished-content-header-select" @change="e=>{changeCurrentSelect(e)}"  data-type="cinema" ref="selectOne">
                    <option>按影厅进行筛选</option>
                    <option v-for="(item, index) in cinemaOption" :key="index" :data-id="item.id">{{item.name}}</option>
                </select>
                <select class="Finished-content-header-select" @change="e=>{changeCurrentSelect(e)}" ref="selectTwo" data-type="user">
                    <option>按用户进行筛选</option>
                    <option v-for="(item, index) in userOption" :key="index" :data-id="item.id">{{item.name}}</option>
                </select>
                <!-- <div class="Finished-content-header-btn" @click="query">筛选</div> -->
            </div>
            <div class="Finished-content-main">
                <div class="Finished-content-main-title">
                    <span class="Finished-content-main-name">剧目名称</span>
                    <span class="Finished-content-main-location">所在影厅</span>
                    <span class="Finished-content-main-seat">座位</span>
                    <span class="Finished-content-main-price">价格</span>
                    <span class="Finished-content-main-user">处理人员</span>
                    <span class="Finished-content-main-time">交易时间</span>
                </div>
                <div class="Finished-content-main-list" v-if="finished.length">
                    <div class="Finished-content-main-list-item" v-for="(item, index) in finished" :key="index">
                        <span class="Finished-content-main-name">{{ item.programmeName }}</span>
                        <span class="Finished-content-main-location">{{ item.theaterName }}</span>
                        <span class="Finished-content-main-seat">{{item.rowNumber}}行{{item.colNumber}}列</span>
                        <span class="Finished-content-main-price">{{ item.price }}</span>
                        <span class="Finished-content-main-user">{{item.userName}}</span>
                        <span class="Finished-content-main-time">{{ item.dateTime | filterTime }}</span>
                    </div>
                </div>
                <div class="Finished-content-main-none" v-else>暂无相关订单信息~</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "finished",
    data(){
        return {
            cinemaOption: [],
            userOption: [],
            queryObj: {},
        }
    },
    created(){
        if(!this.user.length){
            this.$store.dispatch("GET_ALL_USER");
        }
        if(!this.cinema.length){
            this.$store.dispatch("GETALLCINEMA");
        }
        if(this.user.length){
            this.userOption = this.user.map((item,index)=>{
                return { id: item.userId, name: item.userName, type: "user" };
            });
        }
        if(this.cinema.length){
            this.cinemaOption = this.cinema.map((item,index)=>{
                return { id: item.theaterId, name: item.theaterName, type: "cinema" };
            });
        }
        this.$store.dispatch("GET_FINISHED");
    },
    computed:{
        user(){
            return this.$store.state.manger.user;
        },
        cinema(){
            return this.$store.state.manger.cinema;
        },
        finished(){
            return this.$store.state.manger.finished;
        }
    },
    methods:{
        changeCurrentSelect(e){
            let selectedIndex = e.target.selectedIndex;
            if(selectedIndex === 0){
                let type = e.target.getAttribute("data-type");
                if(type === "cinema"){
                    this.queryObj["theaterId"] = 0;
                }
                if(type === "user"){
                    this.queryObj["userId"] = 0;
                }
            }else{
               let id = e.target.options[selectedIndex].getAttribute("data-id");
               let type = e.target.getAttribute("data-type");
               if(type === "user"){
                   this.queryObj["userId"] = Number(id);
               }else{
                   this.queryObj["theaterId"] = Number(id);
               }
            }
            console.log(this.queryObj);
            this.$store.dispatch("GET_FINISHED", this.queryObj).then(res=>{
                console.log(res);
            });
        },
    },
    filters:{
        filterTime(time){
            let arr = time.split("T");
            let date = arr[0];
            let t = arr[1].substr(0, 5);
            return date + " "+ t;
        }
    }
}
</script>
<style lang="less" scoped>
    .Finished{
        height: calc(100% - 75px - 43px);
        &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-header{
                padding: 5px 0;
                line-height: 50px;
                &-select{
                    padding: 10px;
                    // width: 100px;
                    background-color: #fff;
                    border-radius: 4px;
                    outline: none;
                    color: #606266;
                    border: 1px solid #dcdfe6;
                    margin-right: 20px;
                }
                &-btn{
                    cursor: pointer;
                    display: inline-block;
                    padding: 5px 20px;
                    color: #fff;
                    background-color: #00843e;
                    border-radius: 4px;
                }
            }
            &-main{
                // margin-top: 50px;
                height: calc(100% - 60px);
                position: relative;
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
                    width: 150px;
                    padding:  0 20px;
                    text-align: center;
                }
                &-price{
                    width: 80px;
                    padding: 0 20px;
                    text-align: center;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                &-user{
                    width: 110px;
                    padding: 0 20px;
                    text-align: center;
                }
                &-time{
                    padding: 0 20px;
                    text-align: center;
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
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
