<template>
    <div class="Plan">
        <div class="Plan-header">演出计划管理</div>
        <div class="Plan-title">
            <router-link to="/admin/plan/name" class="Plan-title-item">演出计划名称</router-link>
            <router-link to="/admin/plan/ticket" class="Plan-title-item">售票窗口</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'plan',
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .Plan{
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