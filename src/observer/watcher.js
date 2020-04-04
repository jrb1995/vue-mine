import Dep from './dep'

export default class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    this.getter = expOrFn || function () {}
    this.cb = cb
    this.value = this.get()
  }

  get () {
    Dep.target = this

    const vm = this.vm
    let value = this.getter.call(vm, vm)
    return value
  }

  addDep(dep) {
    dep.addSub(this)
  }

  update () {
    console.log('更新value:', this.value)
  }
}