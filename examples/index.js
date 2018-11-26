const faker = require('faker')
const ActiveQueryBuilder = require('./../index')

const DB_HOST = 'localhost'
const DB_USER = 'root'
const DB_PASSWORD = 'Root@12345'
const DB_NAME = 'sandbox'

const conn = new ActiveQueryBuilder({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

const setter = {
  first_name: '__superman__',
  last_name: '__k__',
}

const matcher = {
  id: 10
}

conn.update('person_3803', setter, matcher).then(response => {
  console.log(response)
})
