export function patch(oldVnode, vnode) {
    // oldVnode 是一个真实的元素
    if (!oldVnode) {
        return createElm(vnode)
    }
    const isRealElement = oldVnode.nodeType
    if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode
        const parentElm = oldElm.parentNode; // body
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling); // 将创建的节点查到原有的节点的下一个
        parentElm.removeChild(oldElm);
        return el
    } else {
        // diff算法
    }
}

function createComponent(vnode){
    let i = vnode.data;
    if((i = i.hook) && (i = i.init)){
        i(vnode); // 调用组件的初始化方法 init() vdom 中的index.js createComponent的 data.hook // vnode.componentInstance.$el
    }
    if(vnode.componentInstance){ // 如果虚拟节点上有组件的实例说明当前这个vode是组件
        return true;
    }
    return false;
}

function createElm(vnode) {
    let { tag, children, key, data, text, vm } = vnode;
    if (typeof tag === 'string') {
        if(createComponent(vnode)){
            // 如果返回true 说明这个虚拟节点是组件
            // 如果是组件，就将组件渲染后的真实元素给我
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag)
        updateProperties(vnode);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child))        
        });
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el;
}

function updateProperties(vnode){
    let newProps = vnode.data || {}; // 属性
    let el = vnode.el; // dom元素

    for(let key in newProps){
        if(key == 'style'){
            for(let styleName in newProps.style){
                el.style[styleName] = newProps.style[styleName]
            }
        }else if(key === 'class'){
            el.className = newProps.class
        }else{
            el.setAttribute(key,newProps[key]);
        }
    }


}