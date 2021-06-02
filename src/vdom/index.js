import { isObject, isReservedTag } from "../util";

export function createElement(vm, tag, data = {}, ...children) {
    if (isReservedTag(tag)) {
        return  vnode(vm, tag, data, data.key, children, undefined);
    } else {
        // 组件
        const Ctor = vm.$options.components[tag]; // 对象或者函数
        // Vue.extend
        return createComponent(vm, tag, data, data.key, children, Ctor)
    }
}

function createComponent(vm, tag, data, key, children, Ctor){
    if(isObject(Ctor)){
        Ctor = vm.$options._base.extend(Ctor); // 把对象转化成函数
    }
    // 给组件增加生命周期
    data.hook = {
        init(vnode){
            // 调用子组件的构造函数
            console.log(vnode.componentOptions.Ctor)
            let child = vnode.componentInstance = new vnode.componentOptions.Ctor({}); //实例化以后就会去执行vue的_init方法
            child.$mount(); // 手动挂在  vnode.componentInstance.$el = 真实的元素
        } // 初始化的钩子
    }
    // 组件的虚拟节点拥有hook和当前组件的componentOptions  中存放了组件的构造函数
    return vnode(vm,`vue-component-${Ctor.cid}-${tag}`, data, key, undefined, undefined,{Ctor});
}

export function createTextVnode(vm, text) {
    return vnode(vm,undefined,undefined,undefined,undefined,text)
}
function vnode(vm, tag, data, key, children, text, componentOptions) {
    return {
        vm,
        tag,
        children,
        data,
        key,
        text,
        componentOptions
    }
}