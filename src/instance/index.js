import { observe, set, del } from '../observer/index'

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
  let data = options.data
  this._data = data

  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(this, `_data`, key)
  }

  observe(data)
}

Vue.prototype.$set = set
Vue.prototype.$delete = del

export default Vue