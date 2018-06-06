<template>
  <div class="Admin">
    <div class="Admin-left">
      <img src="../assets/logo.jpg" alt="" class="Admin-left-logo">
      <router-link to="/admin/cinema" class="Admin-left-module">影厅管理</router-link>
      <router-link to="/admin/play" class="Admin-left-module">剧目管理</router-link>
      <router-link to="/admin/plan" class="Admin-left-module">演出计划管理</router-link>
      <router-link to="/admin/ticket" class="Admin-left-module">票务管理</router-link>
      <router-link to="/admin/user" class="Admin-left-module">用户管理</router-link>
    </div>
    <div class="Admin-right">
      <div class="Admin-right-header">
        <span class="Admin-right-header-topic">剧院票务管理系统</span>
        <span class="Admin-right-header-login">登录</span>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less" scoped>
  .Admin{
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
    &-left{
      width: 200px;
      height: 100%;
      background-color: #313541;
      min-width: 200px;
      &-logo{
        width: 100%;
        height: 90px;
      }
      &-module{
        display: block;
        width: 100%;
        height: 90px;
        line-height: 90px;
        text-align: center;
        text-decoration: none;
        color: #707783;
        cursor: pointer;
        // border-bottom: 1px solid #666;
        &:hover{
          background-color: #272A34;
          color: white;
        }
      }
      .router-link-active{
        background-color: #272A34;
        color: white;
      }
    }
    &-right{
      flex: 1;
      height: 100%;
      min-width: 600px;
      &-header{
        width: 100%;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #BFBFC1;
        &-topic{
          margin-left: 50px;
          font-size: 25px;
        }
        &-login{
          float: right;
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
  }
</style>
