<template>
    <div class="CinemaName">
        <div class="CinemaName-content">
            <div class="CinemaName-content-btn content-btn">添加影厅</div>
            <div class="CinemaName-content-main">
                <div class="CinemaName-content-main-title">
                    <span class="CinemaName-content-main-id">影厅ID</span>
                    <span class="CinemaName-content-main-name">影厅名称</span>
                    <span class="CinemaName-content-main-action">操作</span>
                </div>
                <div class="CinemaName-content-main-list">
                    <div class="CinemaName-content-main-list-item ">
                        <span class="CinemaName-content-main-id">20180605</span>
                        <span class="CinemaName-content-main-name">花儿朵朵开</span>
                        <span class="CinemaName-content-main-action">
                            <a href="javascript:void(0)" class="CinemaName-content-main-action-mor action-btn">详情</a>
                            <a href="javascript:void(0)" class="CinemaName-content-main-action-del action-btn">删除</a>
                            <a href="javascript:void(0)" class="CinemaName-content-main-action-upd action-btn">修改</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cinemaName',
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .CinemaName{
        height: calc(100% - 75px - 43px);
        &-content{
            height: 100%;
            padding: 10px;
            background-color: #F6F5FA;
            box-sizing: border-box;
            overflow: hidden;
            &-btn{
                padding: 10px 20px 10px 30px;
                background-color: #00843e;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background-color: #0A904B;
                }
            }
            .content-btn{
                float: left;
                background-image: url('../assets/add.png');
                background-repeat: no-repeat;
                background-position: 8px 13px;
            }
            &-main{
                margin-top: 50px;
                height: calc(100% - 50px);
                border: 1px solid #DBD9E1;
                background-color: #fff;
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
                &-name{
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 200px;
                    text-align: center;
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