<template>
    <div class="TicketName">
        <div class="TicketName-content">
            <div class="TicketName-content-addbtn content-btn">添加票务</div>
            <div class="TicketName-content-main">
                <div class="TicketName-content-main-title">
                    <span class="TicketName-content-main-id">演出计划ID</span>
                    <span class="TicketName-content-main-cinema">所在影厅名称</span>
                    <span class="TicketName-content-main-play">演出剧目</span>
                    <span class="TicketName-content-main-time">演出时间</span>
                    <span class="TicketName-content-main-action">操作</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ticketName',
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
    .TicketName{
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
                }
                &-cinema{
                    padding: 0 10px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                &-play{
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 200px;
                    text-align: center;
                }
                &-time{
                    padding: 0 20px 0 10px;
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
            }
        }
    }
</style>
