import {pushTarget, popTarget} from './dep'
import {queueWatcher} from './schedular'

let id = 0;
class Watcher {
    constructor(vm,exprOrFn,cb,options){
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.id = id++;
        this.getter = exprOrFn;
        this.deps = []  // 让watcher记住dep
        this.depsId = new Set();
        this.get(); // 调用传入的函数,调用了render方法，此时会对魔板中的数据进行取值
    }
    get () {
      pushTarget(this) // 把watcher绑定到dep的target上
      this.getter() // 模板会取值 实际上vm_update(vm._render()), 这样没有在模板上使用的变量就不会监听
      popTarget()
    }
    addDep(dep) {
      let id = dep.id;
      if (!this.depsId.has(id)) {
        this.depsId.add(id);
        this.deps.push(dep);
        dep.addSub(this)
      }
    }
    run() {
      this.get()
    }
    update() { // 如果多次更改 我希望合并成一次  （防抖）
      // this.get(); // 不停的重新渲染
      queueWatcher(this)
    }
}
export default Watcher;