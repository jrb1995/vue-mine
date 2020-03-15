export default class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb
  }
}