import Dep from './dep'
import { arrayMethods } from './array'
import { def, isObject, isValidArrayIndex, hasOwn } from '../util/index'

export class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()
    
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

export function observe (value) {
  if (!isObject(value)) {
    return 
  }

  let ob = new Observer(value)

  return ob
}

export function defineReactive (obj, key, val) {
  const dep = new Dep()
  let childOb = observe(val)
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 将 Watcher 添加到订阅
      dep.depend()
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      // 执行 watcher 的 update 方法
      dep.notify()
    }
  })
}

export function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  
  const ob = target.__ob__

  if (!ob) {
    target[key] = val
    return val
  }

  defineReactive(ob.value, key, val)

  ob.dep.notify()

  return val
}

export function del (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = target.__ob__

  if (!hasOwn(target, key)) {
    return
  }

  delete target[key]

  if (!ob) {
    return
  }
  ob.dep.notify()
}