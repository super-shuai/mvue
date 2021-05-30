let id = 0;
class Dep {
  constructor() {
    this.id = id ++
    this.subs = [] // 属性记住watcher
  }
  depend() {
    // 让watcher记住dep
    Dep.target.addDep(this)
  } 
  addSub (watcher) {
    this.subs.push(watcher)
  }
  notify(){
    console.log(this.subs)
    this.subs.forEach(watcher => watcher.update());
  }
}
Dep.target = null;

export function pushTarget (watcher) {
  Dep.target = watcher
}

export function popTarget() {
  Dep.target = null
}

export default Dep;