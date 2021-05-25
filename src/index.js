import { initMixin } from './init'
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";

function Vue (options) {
  this._init (options)
}
initMixin(Vue)
lifecycleMixin(Vue); // 扩展_update方法
renderMixin(Vue); // 扩展_render方法

export default Vue;