
const db_f = require('../db_functions.js')

describe('db functions module', () => {
  describe('Student tab', () => {
    test('Insert Student into SQL database', () => {
      expect(db_f.insertStudent).toBeDefined()
      expect(typeof db_f.insertStudent).toBe('function')
    })
  })

  describe('Groups tab', () => {
    test('Insert Group into SQL database', () => {
      expect(db_f.insertGroup).toBeDefined()
      expect(typeof db_f.insertStudent).toBe('function')
    })
  })

  afterAll(() => {
    db_f.closeConnections().close()
    done
  })
})
