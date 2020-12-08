test('should be equal with reference', () => {
    const reference = `3 passed, 1 failed

Failed:
  Root
    wat.js
      - 0.1 + 0.2 should be 0.3

All:
  Root
    ++ toString()
    wat.js
      + type of null should be object
      - 0.1 + 0.2 should be 0.3`

    jest.resetModules()

    const lib = require('./lib')

    lib.describe('Root', () => {
        // passed
        lib.it('toString()', () => {
            lib.assert([].toString(), '')
            lib.assert(({}).toString(), '[object Object]')
        })

        lib.describe('wat.js', () => {
            // passed
            lib.it('type of null should be object', () => {
                lib.assert(typeof null, 'object')
            })

            // failed
            lib.it('0.1 + 0.2 should be 0.3', () => {
                lib.assert(0.1 + 0.2, 0.3)
            })
        })
    })

    expect(lib.getResults()).toBe(reference)
})

test('should be equal with custom', () => {
    const custom = `6 passed, 3 failed

Failed:
  Root
    - 0.1 + 0.7 should be 0.8
    wat.js
      -- 0.1 + 0.2 should be 0.3
      -- 0.1 + 0.2 - 0.3 should be 0

All:
  Root
    ++ toString()
    - 0.1 + 0.7 should be 0.8
    wat.js
      ++ typeof
      -- 0.1 + 0.2 should be 0.3
      -- 0.1 + 0.2 - 0.3 should be 0`

    jest.resetModules()

    const lib = require('./lib')

    lib.describe('Root', () => {
        lib.it('toString()', () => {
            lib.assert([].toString(), '')
            lib.assert(({}).toString(), '[object Object]')
        })

        lib.describe('wat.js', () => {
            lib.it('typeof', () => {
                lib.assert(typeof null, 'object')
                lib.assert(typeof undefined, 'undefined')
            })

            lib.it('0.1 + 0.2 should be 0.3', () => {
                lib.assert(0.1 + 0.2, 0.3)
                lib.assert('0.1' + 0.2, 0.3)
            })

            lib.it('0.1 + 0.2 - 0.3 should be 0', () => {
                lib.assert(0.1 + 0.2 - 0.3, 0)
                lib.assert('0.1' + 0.2 - 0.3, 0)
            })
        })

        lib.it('0.1 + 0.7 should be 0.8', () => {
            lib.assert(0.1 + 0.7, 0.8)
        })
    })

    expect(lib.getResults()).toBe(custom)
})

