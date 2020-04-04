import { remove } from '../util/index'

export default class Dep {
  constructor () {
    /* 用来存放 Watcher 对象的数组 */
    this.subs = []
  }

  /* 在 subs 中添加一个 Watcher 对象 */
  addSub (sub) {
    this.subs.push(sub)
  }

  removeSub (sub) {
    remove(this.subs, sub)
  }
  
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  /* 通知所有 Watcher 对象更新视图 */
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

/* 在 watcher.js 中将 Watcher 实例赋值给 Dep.target */ 
Dep.target = null