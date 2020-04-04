import { observe, set, del } from '../observer/index'
import Watcher from '../observer/watcher'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: function () {},
  set: function () {}
}

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function Vue (options) {
  let vm = this
  let data = options.data
  vm._data = data

  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(vm, `_data`, key)
  }

  observe(data)
  /* 新建一个 Watcher 观察者对象，这时候 Dep.target 会指向这个 Watcher 对象 */
  new Watcher(data, val => val)
}

Vue.prototype.$set = set
Vue.prototype.$delete = del

export default Vue