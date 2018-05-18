'use strict';

import jsdom from 'jsdom'
const { JSDOM } = jsdom

const { document } = (new JSDOM('')).window;
global.document = document
global.window = document.defaultView
global.navigator = window.navigator
global.localStorage = window.sessionStorage = {
    getItem: function (key) {
        return this[key]
    },
    setItem: function (key, value) {
        return this[key] = value
    },
    removeItem: function(key) {
        return delete this[key]
    }
}

function noop() {
    return {}
}

require.extensions['.css'] = noop
require.extensions['.svg'] = noop
require.extensions['.scss'] = noop
