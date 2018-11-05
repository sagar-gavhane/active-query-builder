/* eslint-disable no-console */
const QueryBuilder  = require('./../index')
const faker = require('faker')

const conn = new QueryBuilder({
  host: 'localhost',
  user: 'root',
  password: 'Root@12345',
  database: 'sandbox'
})

const table = `person_${faker.random.number()}`

beforeAll((done) => {
  const query = `CREATE TABLE ${table} (id int NOT NULL AUTO_INCREMENT, first_name varchar(255) NOT NULL, last_name varchar(255), PRIMARY KEY (id))`
  conn.query(query)
    .then(() => {
      console.log('table successfully created')
      done()
    }).catch(() => {
      console.log('something went wrong. unable to create table')
    })
})

describe('query method testing', () => {
  it('should be return valid query', (done) => {    
    const query = `INSERT INTO ${table}(first_name, last_name) VALUES (?,?)`
    const first_name = faker.name.firstName()
    const last_name = faker.name.lastName()
    conn.query(query, [first_name, last_name])
      .then(result => {
        console.log(result)
        expect(result.affectedRows).toBe(1)
        done()
      })
  })
})

// afterAll((done) => {
//   const query = `DELETE FROM ${table}`
//   conn.query(query)
//     .then(() => {
//       console.log('table successfully removed')
//       done()
//     }).catch(() => {
//       console.log('failed to remove table')
//       done()
//     })
// })