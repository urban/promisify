/* @flow */
/**
 * promisify
 *
 * Transforms a callback-based function into a Promise. A user can optionally
 * provide their own callback function. If provided, use `this.resolve()` and
 * `this.reject()` within the callback.
 *
 * @param {function} fn - The function to promisify
 * @param {function} callback - Optional custom callback function
 *
 * @return {function} A promisified version of the `fn`
 */
export default function promisify (fn: Function, callback: Function = defaultCallback): Function {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const cb = callback.bind({resolve, reject})
      fn.apply(this, [...args, cb])
    })
  }
}

// Default callback function.
function defaultCallback (err, result) {
  // Reject on truthy error.
  if (err) {
    return this.reject(err)
  }
  this.resolve(result)
}
