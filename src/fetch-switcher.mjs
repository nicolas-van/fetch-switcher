
/**
 * A function builder that will return a function able to dispatch to multiple fetch() implementations.
 *
 * @param {object} schemes An object where each key correspond to an URL scheme and each value to the
 * fetch() implementation that correspond. The empty string ('') is the default fetch() implementation
 * that will be used for all unknown URL schemes.
 * @returns {Function} A new fetch() function that will dispatch to one of the implementations based
 * on the URL scheme of the resource URL.
 * @example
 * import { fetchSwitcher } from 'fetch-switcher'
 *
 * // or
 *
 * const { fetchSwitcher } = require('fetch-switcher')
 *
 * // assuming you have multiple fetch() implementations
 * const fetchGeneric = ...
 * const fetchFile = ...
 * const fetchFtp = ...
 *
 * const fetch = fetchSwitcher({
 *   '': fetchGeneric, // '' is the default
 *   'file': fetchFile,
 *   'ftp': fetchFtp
 * })
 *
 * fetch('http://example.com') // will dispatch to fetchGeneric
 * fetch('https://example.com') // will also dispatch to fetchGeneric
 * fetch('file:///example.txt') // will dispatch to fetchFile
 * fetch('ftp://exampleftp.com') // will dispacth to fetchFtp
 */
function fetchSwitcher (schemes) {
  // TODO
  return (resource, init) => {
    const str = (() => {
      if (_isRequest(resource)) {
        return resource.url
      } else {
        return `${resource}`
      }
    })()
    const impl = (() => {
      const found = str.match(/^(\w+):.*$/)
      if (found) {
        return schemes[found[1]] || schemes['']
      } else {
        return schemes['']
      }
    })()
    return impl(resource, init)
  }
}

export { fetchSwitcher }

/**
 * @ignore
 * @param {any} obj ignore
 * @returns {any} ignore
 */
function _isRequest (obj) {
  if (
    obj &&
    obj.method !== undefined &&
    obj.url !== undefined &&
    obj.headers !== undefined &&
    obj.redirect !== undefined &&
    obj.signal !== undefined &&
    obj.clone !== undefined
  ) {
    return true
  } else {
    return false
  }
}

export { _isRequest }
