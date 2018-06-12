<template>
    <!-- 弹出框提示 -->
    <transition name="Point-fade">
        <div class="Point" v-show="visible" :class="positionClass">{{ message }}</div>
    </transition>
</template>

<script>
export default {
    name: "point",
    data(){
        return {
            position: "center", //默认显示位置
            visible: false,     //是否显示
            duration: 1500,     //显示时间
            message: ''         //显示文本
        }
    },
    computed:{
        positionClass(){
            return 'Point-' + this.position;
        }
    }
}
</script>

<style lang="less" scoped>
    .Point{
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1997;
        border-radius: 5px;
        padding: 10px 20px 10px 30px;
        text-align: center;
        color: #888;
        background-color: #EDF2FC;
        background-image: url("../../assets/tip.png");
        background-position: 5px 10px;
        background-repeat: no-repeat;
        background-size: 20px;
        font-size: 14px;    
        &-top{
            top: 10%;
        }
        &-center{
            top: 50%;
            // transform: translateY(-50%);
        }
        &-bottom{
            bottom: 10%;
        }
    }

    .Point-fade-enter-active{
        transition: all .2s;
    }
    .Point-fade-enter{
        opacity: 0;
        transform: translate3d(-50%, -10px, 0);
    }
    .Point-fade-enter-to{
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
    }
</style>
