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

conn.get('users').then(response => {
  console.log(response.query)
  console.log(result) // this is your result
})

(async () => {
  try {
    const { results, fields, query } = await conn.get('users')
    console.log(results) //
  } catch (Exception) {
    // handle exception
    console.log('Exception', Exception)
  }
})()
