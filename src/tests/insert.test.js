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

const tableName = `person_${faker.random.number().toString().replace('0.', '')}`

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
    const query = `DROP TABLE ${tableName}`
    await conn.query(query)
    done()
  } catch (Exception) {
    throw Exception
  }
})

describe('insert method test', () => {
  // setter is object
  it(`should be insert values from setter object into ${tableName}`, async () => {
    try {
      const first_name = `${faker.name.firstName()}${Math.random()}`
      const last_name = `${faker.name.lastName()}${Math.random()}`
      const setter = {
        first_name,
        last_name
      }
      const { results } = await conn.insert(tableName, setter)
      expect(results.affectedRows).toBe(1)
    } catch (Exception) {
      throw Exception
    }
  })

  // setter is arrayOfObject
  it(`should be insert values from array of setter object into ${tableName}`, async () => {
    try {
      const first_name = `${faker.name.firstName()}${Math.random()}`
      const last_name = `${faker.name.lastName()}${Math.random()}`
      const setter = {
        first_name,
        last_name
      }
      const { results } = await conn.insert(tableName, [setter])
      expect(results.affectedRows).toBe(1)
    } catch (Exception) {
      throw Exception
    }
  })
})
