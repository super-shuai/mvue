import { initMixin } from './init'
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { initGlobalAPI } from "./global-api/index";


function Vue (options) {
  this._init (options)
}
initMixin(Vue)
lifecycleMixin(Vue); // 扩展_update方法
renderMixin(Vue); // 扩展_render方法

initGlobalAPI(Vue); // 混合全局的api

export default Vue;