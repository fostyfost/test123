const listToTree = list => {
    const map = {}
    const roots = []

    for (let i = 0; i < list.length; i += 1) {
        map[list[i].id] = i
        list[i].children = []
    }

    let node

    for (let i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parentId) {
            list[map[node.parentId]].children.push(node)
        } else {
            roots.push(node)
        }
    }

    return roots
}

module.exports = { listToTree }
