/**
 * Returns a closure for a Queue implementation with Array
 * Author: Farhan Israq <farhan@rocketfry.com>
 *
 * @returns useSimpleQueue() closure for queue
 */

export const useSimpleQueue = <T>() => {
  const _store: Array<T> = []
  let _head = 0
  let _tail = 0

  const enqueue = (data: T) => {
    _store[_tail] = data
    _tail++
  }

  const dequeue = () => {
    if (_tail - _head <= 0) {
      return null
    }

    const data = _store[_head]
    delete _store[_head]
    _head++
    return data
  }

  return {
    enqueue,
    dequeue,
    peek: () => _store[_head],
    get store() {
      return _store
    },
    get head() {
      return _head
    },
    get tail() {
      return _tail
    },
    get size() {
      return this.tail - this.head
    },
    get isEmpty() {
      return this.size === 0
    },
    get isNotEmpty() {
      return !this.isEmpty
    },
  }
}
