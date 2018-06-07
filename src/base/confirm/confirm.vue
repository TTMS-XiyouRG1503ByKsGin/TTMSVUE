<template>
    <div class="Confirm" v-show="visible">
        <div class="Confirm-box">
            <div class="Confirm-box-header">
                <span class="Confirm-box-header-title">提示</span>
                <span class="Confirm-box-header-close" @click="visible=false">X</span>
            </div>
            <div class="Confirm-box-content">
                {{ message }}
            </div>
            <div class="Confirm-box-btn">
                <div class="Confirm-box-btn-cancel" @click="confirm('calcelBtn')">取消</div>
                <div class="Confirm-box-btn-confirm" @click="confirm('confirmBtn')">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            messgae: "", //显示消息文本
            visible: false, //是否显示
            callback: null
        }
    },
    methods: {
        confirm(action){
            this.visible = false;
            this.callback(action);
        }
    }
}
</script>

<style lang="less" scoped>
    .Confirm{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2001;
        background-color: rgba(0, 0, 0, .2);
        &-box{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 420px;
            background-color: #fff;
            border-radius: 3px;
            padding: 20px;
            overflow: hidden;
            &-header{
                &-title{
                    font-weight: bold;
                }
                &-close{
                    float: right;
                    cursor: pointer;
                }
            }
            &-content{
                padding: 30px 20px;
                font-size: 14px;
                color: #48576a;
            }
            &-btn{
                text-align: right;
                font-size: 14px;
                &-cancel{
                    display: inline-block;
                    padding: 10px 15px;
                    border: 1px solid #c4c4c4;
                    border-radius: 4px;
                    color: #1f2d3d;
                    cursor: pointer;
                    &:hover{
                        color: #20a0ff;
                        border-color: #20a0ff;
                    }
                }
                &-confirm{
                    display: inline-block;
                    margin-left: 20px;
                    padding: 10px 15px;
                    background-color: #20a0ff;
                    color: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                    &:hover{
                        background-color: #76BFF2;
                    }
                }
            }
        }
    }
</style>
