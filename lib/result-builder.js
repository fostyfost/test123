const {findParentItems} = require("./utils/find-parent-items")
const {listToTree} = require('./utils/list-to-tree')
const {mergeDeep} = require('./utils/merge-deep')
const {pad} = require('./utils/pad')

const resultBuilder = (items, describes, onlyFailed = false) => {
    let results = []

    items.forEach(item => {
        const list = findParentItems(describes, item.parentId)

        let asserts = item.asserts

        if (onlyFailed) {
            asserts = asserts.filter(assert => assert === '-')
        }

        asserts = asserts.reduce((acc, assert) => {
            if (!acc[item.name]) {
                acc[item.name] = ''
            }

            acc[item.name] += assert

            return acc
        }, {})

        list.push({parentId: list[list.length - 1].id, asserts})

        results = mergeDeep(results, listToTree(list))
    })

    return results.reduce((acc, result) => pad(acc, result, 1), '')
}

module.exports = {resultBuilder}
