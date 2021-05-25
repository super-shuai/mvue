import Dep from "./dep";
import { arrayMethods } from "./array"

class Observer {
  constructor(value) {
    // value.__ob__ = this; 
    Object.defineProperty(value,'__ob__',{
      value:this,
      enumerable:false, // 不能被枚举表示 不能被循环
      configurable:false,// 不能删除此属性
    }) 
    if (Array.isArray(value)) {
      // 监听数组 
      // value.__proto__ = arrayMethods // 当是数组时改写方法为自己重写后的方法
      Object.setPrototypeOf(value,arrayMethods); // 循环将属性赋予上去  
      this.observeArray(value); // 原有数组中的对象  Object.freeze()
    } else {
      this.walk(value)
    }
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
  observeArray(value) {
    for (let i=0; i < value.length; i ++) {
      observe(value[i])
    }
  }
}

export function defineReactive(data, key, value) {
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get() { //需要给每个属性都增加一个dep 
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue)
      value = newValue
      dep.notify();// 通知dep中记录的watcher让它去执行
    }
  })
  // 递归
  observe(value)
}
export function observe(data) {
  // 只对对象类型进行观测 非对象类型无法观测
  if (typeof data !== 'object' || data == null) {
    return;
  }
  if(data.__ob__){ // 防止循环引用了
    return;
  }
  // 通过类来对实现对数据的观测 类可以方便扩展，会产生实例
  return new Observer(data);
}