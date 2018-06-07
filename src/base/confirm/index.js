import Confirm from './Confirm.vue';

//定义提示框插件
let showConfirm = false, instance, flag=false;

const confirm = {
    install(Vue, option={}){
        let opt = Confirm.data(); //获取组件的默认data
        // let met = Confirm.methods;
        Object.assign(opt, option);
        // Object.assign(met, option);
        //定义实例方法
        Vue.prototype.$confirm = (message) => {
            return new Promise((resolve, reject) => {
                if(message){
                    opt.message = message;
                }
                let confirmConstructor = Vue.extend(Confirm);
                instance = new confirmConstructor({
                    data: opt,
                    // method: met,
                });
                instance.vm = instance.$mount();
                document.body.appendChild(instance.vm.$el);
                
                instance.vm.visible = showConfirm = true;
                instance.vm.callback = function(action){
                    console.log(action);
                    if(action === 'confirmBtn'){
                        resolve("confirm");
                    }else if(action == "calcelBtn"){
                        reject("cancel");
                    }
                }
            })
        }
    }
}

export default confirm;