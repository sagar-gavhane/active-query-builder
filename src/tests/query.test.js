/* eslint-disable no-console */
require('dotenv').config()
const QueryBuilder = require('./../index')
const faker = require('faker')
const isEmpty = require('lodash/isEmpty')

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

describe('query methods', () => {
  // * SELECT a record using query method
  it(`should be validate select query to table:${tableName} successfully executed.`, async (done) => {
    try {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()

      const query = `INSERT INTO ${tableName}(first_name, last_name) VALUES (?,?)`
      const {results} = await conn.query(query, [first_name, last_name])

      if (results.affectedRows === 1) {
        const query = 'SELECT * FROM ${} WHERE first_name=? AND last_name=?'
        const {results} = await conn.query(query, first_name, last_name)

        if (!isEmpty(results)) {
          expect(results.length).toBe(1)
        }
        done()
      } else {
        throw new Error('Unable to insert records')
      }
    } catch (Exception) {
      throw Exception
    }
  })

  // * insert a record using query method
  it(`should be validate insert into table:${tableName} successfully executed.`, async (done) => {
    try {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()

      const query = `INSERT INTO ${tableName}(first_name, last_name) VALUES (?,?)`
      const {results} = await conn.query(query, [first_name, last_name])
      expect(results.affectedRows).toBe(1)
      done()
    } catch (Exception) {
      throw Exception
    }
  })

  // * UPDATE a record using query method
  it(`should be validate update into table:${tableName} successfully executed.`, async (done) => {
    try {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()

      const query = `INSERT INTO ${tableName}(first_name, last_name) VALUES (?,?)`
      const {results} = await conn.query(query, [first_name, last_name])

      if (results.affectedRows === 1) {
        const updated_first_name = faker.name.firstName()
        const updated_last_name = faker.name.lastName()
        const query = `UPDATE ${tableName} SET first_name=?, last_name=? WHERE first_name='${first_name}' AND last_name='${last_name}'`
        const {results} = await conn.query(query, [updated_first_name, updated_last_name])

        expect(results.affectedRows).toBe(1)
        done()
      } else {
        throw new Error(`Unable to insert records into ${tableName}`)
      }
    } catch (Exception) {
      throw Exception
    }
  })

  // * DELETE a record using query method
  it(`should be validate delete into table:${tableName} successfully executed.`, async (done) => {
    try {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()

      const query = `INSERT INTO ${tableName}(first_name, last_name) VALUES (?,?)`
      const {results} = await conn.query(query, [first_name, last_name])

      if (results.affectedRows === 1) {
        const query = `DELETE FROM ${tableName} WHERE first_name='${first_name}' AND last_name='${last_name}'`
        const {results} = await conn.query(query, [first_name, last_name])

        expect(results.affectedRows).toBe(1)
        done()
      } else {
        throw new Error(`Unable to insert records into ${tableName}`)
      }
    } catch (Exception) {
      throw Exception
    }
  })
})
