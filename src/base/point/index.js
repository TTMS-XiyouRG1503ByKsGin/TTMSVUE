import Point from './Point.vue';

//定义提示框插件
let showPoint = false, instance, time;
const pointTip = {
    install(Vue, option={}){
        let opt = Point.data(); //获取组件的默认data
        Object.assign(opt, option);
        //定义实例方法
        Vue.prototype.$pointTip = (message, position) => {
            if(showPoint){
                clearTimeout(time);
                instance.vm.visible = showPoint = false;
                document.body.removeChild(instance.vm.$el);
            }
    
            if(message){
                opt.message = message;
            }
            if(position){
                opt.position = position;
            }
            let pointConstructor = Vue.extend(Point);
            instance = new pointConstructor({
                data: opt
            });
            instance.vm = instance.$mount();
            document.body.appendChild(instance.vm.$el);
            instance.vm.visible = showPoint = true;
    
            time = setTimeout(function(){
                instance.vm.visible = showPoint = false;
                document.body.removeChild(instance.vm.$el);
            }, opt.duration);
        }
    }
}

export default pointTip;