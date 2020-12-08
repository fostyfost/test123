const getTotalAssertsLength = (its) => {
    return [].concat(...its.map(item => item.asserts)).length
}

module.exports = { getTotalAssertsLength }
