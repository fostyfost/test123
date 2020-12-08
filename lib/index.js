const os = require('os')
const {resultBuilder} = require("./result-builder")
const {getTotalAssertsLength} = require("./utils/get-total-asserts-length")
const nanoid = require('nanoid').nanoid
const { getLastItem } = require('./utils/get-last-item')

const store = {
    describes: [],
    its: [],
}

const describes = []
let currentIt = null

const describe = (name, callback) => {
    const parent = getLastItem(describes)

    const item = {
        id: nanoid(),
        name: name,
        parentId: parent?.id,
        parentName: parent?.name,
    }

    store.describes.push(item)

    describes.push(item)

    callback()

    describes.pop()
}

const assert = (actual, expect) => {
    currentIt.asserts.push(actual === expect ? '+' : '-')
}

const it = (name, callback) => {
    const parent = getLastItem(describes)

    const item = {
        id: nanoid(),
        name,
        parentId: parent?.id,
        parentName: parent?.name,
        asserts: []
    }

    store.its.push(item)

    currentIt = item

    callback()

    currentIt = null
}

const getResults = () => {
    const failedIts = store.its.filter(item => item.asserts.some(assert => assert === '-'))

    const failedAssertsLength = [].concat(...failedIts.map(item => item === '-')).length

    let results = ''

    results += `${getTotalAssertsLength(store.its) - failedAssertsLength} passed, `
    results += `${failedAssertsLength} failed${os.EOL}${os.EOL}`

    if (failedAssertsLength) {
        results += `Failed:${os.EOL}`

        results += resultBuilder(failedIts, store.describes, true)

        results += `${os.EOL}`
    }

    results += `All:${os.EOL}`

    results += resultBuilder(store.its, store.describes)

    return results.trim()
}

module.exports = {
    describe,
    assert,
    it,
    getResults,
}
