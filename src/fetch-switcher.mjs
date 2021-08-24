
/**
 * A function builder that will return a function able to dispatch to multiple fetch() implementations.
 *
 * @param {object} schemes An object where each
 * @returns {string} test
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
    return schemes[''](resource, init)
  }
}

export { fetchSwitcher }
