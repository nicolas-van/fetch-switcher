
import { expect, test } from '@jest/globals'
import { fetchSwitcher, _isRequest } from './fetch-switcher.mjs'
import { Request } from 'cross-fetch'

test('uses default', () => {
  const fetchDefault = () => {
    return 'hello'
  }
  const fetch = fetchSwitcher({
    '': fetchDefault
  })
  expect(fetch()).toBe('hello')
})

test('_isRequest', () => {
  expect(_isRequest(undefined)).toBe(false)
  expect(_isRequest(null)).toBe(false)
  expect(_isRequest('hello')).toBe(false)
  expect(_isRequest(new URL('http://example.com'))).toBe(false)
  expect(_isRequest(new Request('http://example.com'))).toBe(true)
})

test('string', () => {
  const fetchDefault = () => {
    return 'default'
  }
  const fetchFile = () => {
    return 'file'
  }
  const fetchFtp = () => {
    return 'ftp'
  }
  const fetch = fetchSwitcher({
    '': fetchDefault,
    file: fetchFile,
    ftp: fetchFtp,
    ftps: fetchFtp
  })
  expect(fetch('http://example.com')).toBe('default')
  expect(fetch('https://example.com')).toBe('default')
  expect(fetch('file:///example.txt')).toBe('file')
  expect(fetch('ftp://example.com')).toBe('ftp')
  expect(fetch('ftps://example.com')).toBe('ftp')
  expect(fetch('./folder')).toBe('default')
})

test('url', () => {
  const fetchDefault = () => {
    return 'default'
  }
  const fetchFile = () => {
    return 'file'
  }
  const fetchFtp = () => {
    return 'ftp'
  }
  const fetch = fetchSwitcher({
    '': fetchDefault,
    file: fetchFile,
    ftp: fetchFtp,
    ftps: fetchFtp
  })
  expect(fetch(new URL('http://example.com'))).toBe('default')
  expect(fetch(new URL('https://example.com'))).toBe('default')
  expect(fetch(new URL('file:///example.txt'))).toBe('file')
  expect(fetch(new URL('ftp://example.com'))).toBe('ftp')
  expect(fetch(new URL('ftps://example.com'))).toBe('ftp')
})

test('request', () => {
  const fetchDefault = () => {
    return 'default'
  }
  const fetchFile = () => {
    return 'file'
  }
  const fetchFtp = () => {
    return 'ftp'
  }
  const fetch = fetchSwitcher({
    '': fetchDefault,
    file: fetchFile,
    ftp: fetchFtp,
    ftps: fetchFtp
  })
  expect(fetch(new Request('http://example.com'))).toBe('default')
  expect(fetch(new Request('https://example.com'))).toBe('default')
  expect(fetch(new Request('file:///example.txt'))).toBe('file')
  expect(fetch(new Request('ftp://example.com'))).toBe('ftp')
  expect(fetch(new Request('ftps://example.com'))).toBe('ftp')
  expect(fetch(new Request('./folder'))).toBe('default')
})
