/* eslint-disable no-console */
require('dotenv').config()
const QueryBuilder = require('./../index')
const faker = require('faker')

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env

const conn = new QueryBuilder({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

const tableName = `person_${faker.random.number()}`

beforeAll(async (done) => {
  try {
    const query = `CREATE TABLE ${tableName} (id int NOT NULL AUTO_INCREMENT, first_name varchar(255) NOT NULL, last_name varchar(255), PRIMARY KEY (id))`
    await conn.query(query)
    done()
  } catch (Exception) {
    console.log('something went wrong. unable to create table')
    done()
  }
})

afterAll(async (done) => {
  try {
    const query = `DELETE FROM ${tableName}`
    await conn.query(query)
    done()
  } catch (Exception) {
    console.log(`failed to delete created table:${tableName}`)
    done()
  }
})

/**
 * @todo Write atleast five tests for query method
 * @body To make reliable query method, we have to add 5 more tests for query method
 */
describe('query method testing', () => {
  it(`should be return insert records into table:${tableName}`, async (done) => {
    try {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()

      const query = `INSERT INTO ${tableName}(first_name, last_name) VALUES (?,?)`
      const result = await conn.query(query, [first_name, last_name])
      expect(result.affectedRows).toBe(1)
      done()
    } catch (Exception) {
      throw Exception
    }
  })
})
