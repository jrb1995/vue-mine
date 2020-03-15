import Dep from './dep'
import { arrayMethods } from './array'
import { def, isObject } from '../util/index'

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
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

export function set () {}

export function del () {}