# EventEmitter实现

```javascript
class EventEmitter {
  eventMap = {}
  on(eventName, handler) {
    if (!(handler instanceof Function)) {
      throw new eventNameError('handler must be Function')
    }

    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = []
    }

    this.eventMap[eventName].push(handler)
  }
  emit(eventName, params) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].forEach(handler => handler(params))
    }
  }
  off(eventName, handler) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName] = this.eventMap[eventName].filter(
        h => h != handler
      )
    }
  }
}

// test
const eventEmitter = new EventEmitter()
const add1 = ({ a, b } = params) => {
  console.log('add', a + b)
}
const add2 = ({ a, b } = params) => {
  console.log('add', a + b + b)
}
eventEmitter.on('add', add1)
eventEmitter.on('add', add2)
eventEmitter.emit('add', { a: 3, b: 4 })
eventEmitter.off('add', add2)
eventEmitter.emit('add', { a: 3, b: 4 })

```

