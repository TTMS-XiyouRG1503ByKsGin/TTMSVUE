<template>
  <div class="login">
    <div class="login-header">
        <h1 class="login-header-title">剧院票务管理登录</h1>
    </div>
    <div class="login-item">
        <input type="text" placeholder="用户名" autofocus="autofocus" v-model="username" >
    </div>
    <div class="login-item">
        <input type="password" placeholder="密码" v-model="password">
    </div>
    <div class="login-item">
        <div>
            <input type="text" placeholder="验证码" v-model="vercode" class="vercode" @keyup.enter="login"/>
            <img :src="vercodeSrc" alt="" @click="getVercode" />
        </div>
    </div>
    <div class="login-item">
        <button @click="login">登 录</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "login",
    data(){
        return {
            username: "",
            password: "",
            vercodeSrc: '',
            vercode: ''
        }
    },
    created(){
        this.getVercode();
        if(sessionStorage.getItem("token")){
            this.$router.push("/admin");
        }
    },
    computed:{
        dynamicRoutes(){
            return this.$store.getters.dynamicRoutes;
        }
    },
    methods:{
        getVercode(){
            this.$store.dispatch("getVercode").then((res) => {
                this.vercodeSrc = `data:image/jpg;base64,${res.base64}`;
            }).catch((err) => {
                console.log(err);
            });
        },
        login(){
            if(this.vercode === ''){
                this.$pointTip("验证码不能为空~");
                return;
            }
            if(this.username === ''){
                this.$pointTip("用户名不能为空~");
                return;
            }
            if(this.password === ''){
                this.$pointTip("密码不能为空~");
                return;
            }
            let info = {
                username: this.username,
                password: this.password,   
                vercode: this.vercode       
            }
            this.$store.dispatch("login", info).then(res => {
                if(res.result === 200){
                    this.$store.dispatch("getUserInfoByAccount",this.username).then(res=>{
                        if(res.result === 200){
                            this.$router.addRoutes(this.dynamicRoutes);
                            this.$router.push("/admin");
                        }
                    });
                    this.$pointTip(res.msg);
                }
            }).catch(e => {
            });
        },
    }
}
</script>

<style lang="less" scoped>
    .login{
        max-width: 640px;
        margin: 0 auto;
        padding-top: 150px;
        &-header{
            margin: 0 auto 50px auto;
            text-align: center;
            h1{
                margin-top: 0;
            }
        }
        &-item{
            margin-bottom: 10px;
            padding: 0 10px;
            input{
                display: block;
                margin: 0 auto;
                width: 300px;
                height: 40px;
                border: 1px solid #888;
                text-indent: 10px;
            }
            button{
                display: block;
                margin: 0 auto;
                width: 300px;
                height: 50px;
                margin: 20px auto;
                color: white;
                background-color: #00843e;
                border-radius: 5px;
                border: 0;
                cursor: pointer;
                font-size: 18px;
            }
            div{
                margin: 0 auto;
                width: 300px;
                height: 40px;
                .vercode{
                    float: left;
                    width: 150px;
                    height: 40px;
                }
                img{
                    float: right;
                    width: 100px;
                    height: 40px;
                    border: 1px solid #888;
                    cursor: pointer;
                }
            }
        }
    }
</style>
