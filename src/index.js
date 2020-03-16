import Vue from './instance/index'

const vm = new Vue({
  data: {
    message: 'hello',
    location: { x: 100, y: 100 },
    arr: [1]
  }
})

window.vm = vm

console.log(vm);