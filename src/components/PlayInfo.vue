<template>
    <div class="PlayInfo">
       <div class="PlayInfo-content">
            <div class="PlayInfo-content-addbtn content-btn">添加剧目</div>
            <div class="PlayInfo-content-updbtn content-btn">修改剧目</div>
            <div class="PlayInfo-content-delbtn content-btn">删除剧目</div>
            <div class="PlayInfo-content-main">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'playInfo',
    data(){
        return{

        }
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
                background-color: #fff;
            }
        }

    }
</style>