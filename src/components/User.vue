<template>
    <div class="User">
        <div class="User-header">用户管理</div>
        <div class="User-title">
            <router-link to="/admin/user/name" class="User-title-item">用户信息</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'user',
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .User{
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