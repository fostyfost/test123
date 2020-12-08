const {getResults, describe, assert, it} = require('./lib')

describe('Root', () => {
    // passed
    it('toString()', () => {
        assert([].toString(), '')
        assert(({}).toString(), '[object Object]')
    })

    describe('wat.js', () => {
        // passed
        it('type of null should be object', () => {
            assert(typeof null, 'object')
        })

        // failed
        it('0.1 + 0.2 should be 0.3', () => {
            assert(0.1 + 0.2, 0.3)
        })
    })
})

console.log(getResults())
