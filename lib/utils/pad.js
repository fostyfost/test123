const os = require('os')

const pad = (str, result, depth) => {
    if (result.asserts) {
        str += `${Object.entries(result.asserts).map(([name, sign]) => {
            return `${' '.repeat(depth * 2)}${sign} ${name}`
        }).join(`${os.EOL}`)}${os.EOL}`
    }

    if (!result.name) {
        return str
    }

    str += `${' '.repeat(depth * 2)}${result.name}${os.EOL}`

    if (result.children.length) {
        return result.children.reduce((acc, item) => {
            return pad(acc, item, depth + 1)
        }, str)
    }

    return str
}

module.exports = { pad }
