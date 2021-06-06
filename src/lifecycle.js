import Watcher from "./observer/watcher"
import { patch } from './vdom/patch'
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
      console.log('vnode', vnode)
        // 将虚拟节点转换成真实的dom
        const vm = this;
        // 初始化渲染的时候 会创建一个新节点并且将老节点删掉
       const preVnode = vm._vnode;
       vm._vnode = vnode
       if (!preVnode) {
           vm.$el = patch(vm.$el, vnode)
       } else {
            vm.$el = patch(preVnode, vnode)
       }
        // 1.第一次渲染完毕后 拿到新的节点，下次再次渲染时替换上次渲染的结果
        vm.$el = patch(vm.$el, vnode);

    }
}

export function callHook(vm,hook){ // 发布模式
    const handlers = vm.$options[hook];
    if(handlers){
        handlers.forEach(handler=>handler.call(vm));
    }
}

export function mountComponent(vm) {


    // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）

    let updateComponent = () => {
        vm._update(vm._render()); // 虚拟节点变成真实节点
    }
    new Watcher(vm, updateComponent, () => {}, true); // updateComponent();
}