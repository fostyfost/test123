const findParentItems = (items, id, acc = []) => {
    const result = items.find(item => item.id === id)

    if (result) {
        acc.unshift(result)

        if (result.parentId) {
            findParentItems(items, result.parentId, acc)
        }
    }

    return acc
}

module.exports = { findParentItems }
