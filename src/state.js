import { observe } from "./observer/index.js";
// 初始化状态
export function initState (vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
}

function initData (vm) {
  // 数据劫持Object.definePropery
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // 通过vm._data 获取劫持后的数据，用户就可以拿到_data了
  // 将_data中的数据全部放到vm上
  for(let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)  // 检测数据
}

// 代理把_data上的数据挂载在vm上
function proxy (vm,source,key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}