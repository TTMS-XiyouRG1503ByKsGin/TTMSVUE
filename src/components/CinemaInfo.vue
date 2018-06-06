<template>
    <div class="CinemaInfo">
        <div class="CinemaInfo-content">
            <div class="CinemaInfo-content-header">
                <input type="text" autofocus="autofocus" class="CinemaInfo-content-header-input" />
                <button class="CinemaInfo-content-header-btn">查 询</button>
                <div class="CinemaInfo-content-header-tip">
                    <span class="CinemaInfo-content-header-tip-cor"></span>
                    <span>正常</span>
                    <span class="CinemaInfo-content-header-tip-err"></span>
                    <span>损坏</span>
                </div>
            </div>
            <div class="CinemaInfo-content-main">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cinemaInfo',
    data(){
        return{

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
            }
        }
    }
</style>