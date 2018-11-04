const mysql = require( 'mysql')
const GET_QUERY_BUILDER = require('./get_query_builder')

class QueryBuilder extends GET_QUERY_BUILDER {
  constructor(config) {
    super(config)
    this.connection = mysql.createConnection(config)
    this.tableName = ''
    this.select = ''
  }
  
  query(sql, args){
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  }

  close(){
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}

module.exports = QueryBuilder