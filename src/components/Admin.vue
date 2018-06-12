<template>
  <div class="Admin">
    <div class="Admin-left">
      <img src="../assets/logo.jpg" alt="" class="Admin-left-logo">
      <router-link to="/admin/cinema" class="Admin-left-module">影厅管理</router-link>
      <router-link to="/admin/play" class="Admin-left-module">剧目管理</router-link>
      <router-link to="/admin/plan" class="Admin-left-module">演出计划管理</router-link>
      <!-- <router-link to="/admin/ticket" class="Admin-left-module">票务管理</router-link> -->
      <router-link to="/admin/user" class="Admin-left-module">用户管理</router-link>
    </div>
    <div class="Admin-right">
      <div class="Admin-right-header">
        <span class="Admin-right-header-topic">剧院票务管理系统</span>
        <span v-if="this.token === ''" class="Admin-right-header-login">登录</span>
        <span v-else class="Admin-right-header-account">
          欢迎：{{this.account}}
          <span class="Admin-right-header-account-exit" @click="exit">退出</span>
        </span>
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
  },
  computed: {
    account(){
      return this.$store.state.auth.account;
    },
    token(){
      return this.$store.state.auth.token;
    }
  },
  methods:{
    exit(){
      this.$store.commit("deleteToken");
      this.$router.push("/login");
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
      width: 180px;
      height: 100%;
      background-color: #313541;
      min-width: 180px;
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
        &-account{
          float: right;
          position: relative;
          cursor: pointer;
          margin-right: 10px;
          &:hover{
            .Admin-right-header-account-exit{
              display: block;
            }
          }
          &-exit{
            position: absolute;
            text-align: center;
            line-height: 20px;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            overflow: hidden;
            display: none;
            font-size: 14px;
            padding: 5px 10px;
            border: 1px solid #DBD9E1;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
