<template>
    <div class="Cinema">
        <div class="Cinema-header">影厅管理</div>
        <div class="Cinema-title">
            <router-link to="/admin/cinema/name" class="Cinema-title-item">影厅名称</router-link>
            <router-link to="/admin/cinema/info" class="Cinema-title-item">影厅信息</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'cinema',
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .Cinema{
        height: calc(~'100% - 90px');
        &-header{
            height: 75px;
            line-height: 75px;
            font-size: 20px;
            margin-left: 20px;
        }
        &-title{
            position: relative;
            height: calc(2*10px + 21px + 2px - 1px);
            border-bottom: 1px solid #BFBFC1;
            &-item{
                display: inline-block;
                padding: 10px 15px;
                margin-left: 10px;
                text-decoration: none;
                color: #000;
                font-size: 16px;
                &:hover{
                    .router-link-active;
                }
            }
            .router-link-active{
                border-top: 2px solid #00843e;
                border-left: 1px solid #BFBFC1;
                border-right: 1px solid #BFBFC1;
                background: #f6f5fa;
                color: #FF6000;
            }
        }
    }
</style>