
import { expect, test } from '@jest/globals'
import { fetchSwitcher } from './fetch-switcher.mjs'

test('uses default', async () => {
  const fetchDefault = () => {
    return 'hello'
  }
  const fetch = fetchSwitcher({
    '': fetchDefault
  })
  expect(fetch()).toBe('hello')
})
