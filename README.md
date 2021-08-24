# fetch-switcher

[![GitHub Repo stars](https://img.shields.io/github/stars/nicolas-van/fetch-switcher?style=social)](https://github.com/nicolas-van/fetch-switcher/stargazers) [![Node.js CI](https://github.com/nicolas-van/fetch-switcher/workflows/Node.js%20CI/badge.svg)](https://github.com/nicolas-van/fetch-switcher/actions) [![npm](https://img.shields.io/npm/v/fetch-switcher)](https://www.npmjs.com/package/fetch-switcher) [![Coverage Status](https://coveralls.io/repos/github/nicolas-van/fetch-switcher/badge.svg?branch=master)](https://coveralls.io/github/nicolas-van/fetch-switcher?branch=master) [![](https://data.jsdelivr.com/v1/package/npm/fetch-switcher/badge)](https://www.jsdelivr.com/package/npm/fetch-switcher)

An utility dispatching to multiple implementations of fetch() depending on the URL scheme.

## Installation

```bash
npm install fetch-switcher
```

## Usage

```javascript
import { fetchSwitcher } from 'fetch-switcher'
// or
const { fetchSwitcher } = require('fetch-switcher')

// assuming you have multiple fetch() implementations
const fetchGeneric = ...
const fetchFile = ...
const fetchFtp = ...

const fetch = fetchSwitcher({
  '': fetchGeneric, // '' is the default
  'file': fetchFile,
  'ftp': fetchFtp
})

fetch('http://example.com') // will dispatch to fetchGeneric
fetch('https://example.com') // will also dispatch to fetchGeneric
fetch('file:///example.txt') // will dispatch to fetchFile
fetch('ftp://exampleftp.com') // will dispacth to fetchFtp
```

## Compatibility

`fetch-switcher` has no dependencies and is simple enough that it should work on all browsers and Node versions. (Which may of course
not the case of the `fetch()` implementations you choose to use.)

## Changelog

[The changelog](https://github.com/nicolas-van/fetch-switcher/blob/master/CHANGELOG.md).

## Contribution Guide

[The contribution guide](https://github.com/nicolas-van/fetch-switcher/blob/master/CONTRIBUTING.md)

## License

[The license](https://github.com/nicolas-van/fetch-switcher/blob/master/LICENSE.md).
