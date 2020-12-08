const mergeWith = require('lodash').mergeWith

const customizer = (objValue, srcValue, key) => {
    if (key === 'asserts' && Array.isArray(objValue)) {
        return objValue.concat(srcValue)
    }

    return undefined
}

const mergeDeep = (object, other) => {
    return mergeWith(object, other, customizer)
}

module.exports = { mergeDeep }
