
import { expect, test } from '@jest/globals'
import { fetchSwitcher } from './fetch-switcher.mjs'

test('base', async () => {
  expect(fetchSwitcher()).toBe('hello')
})
