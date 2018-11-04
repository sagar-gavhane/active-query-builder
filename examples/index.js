// const faker = require('faker')
const QueryBuilder = require('./../index')

const conn = new QueryBuilder({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my_db',
})

conn.get('users').then(response => console.log(response))
