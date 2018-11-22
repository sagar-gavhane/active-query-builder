/* eslint-disable no-console */
require('dotenv').config()
const ActiveQueryBuilder = require('./../index')
const faker = require('faker')

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env

const conn = new ActiveQueryBuilder({
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
    throw Exception
  }
})

afterAll(async (done) => {
  try {
    const query = `DELETE FROM ${tableName}`
    await conn.query(query)
    done()
  } catch (Exception) {
    throw Exception
  }
})

describe('get method test', () => {
  // with tableName
  it(`should be get all records of an ${tableName}`, async (done) => {
    try {
      const first_name = `${faker.name.firstName()}${Math.random()}`
      const last_name = `${faker.name.lastName()}${Math.random()}`

      const insertQuery = `INSERT INTO ${tableName}(first_name, last_name) VALUES (?,?)`
      const { results: insertResult } = await conn.query(insertQuery, [first_name, last_name])

      if (insertResult.affectedRows === 1) {
        const { results } = await conn.get(tableName)
        expect(results.length).toBeGreaterThanOrEqual(1)
        done()
      } else {
        throw new Error(`Unable to insert record into ${tableName}`)
      }
    } catch (Exception) {
      throw Exception
    }
  })

  // with tableName, limit
  // with tableName, limit, offset
  // with tableName, null, offset,
  // with tableName, null, null, GET_COMPILED_QUERY = true
  // with tableName, '1.5', '1.5'
  // with tableName, '-1', '-1'
  // with tableName, '1', offset
})
