const mysql = require( 'mysql')
const GetQueryBuilder = require('./GetQueryBuilder')

class QueryBuilder extends GetQueryBuilder {
  constructor(config) {
    super(config)
    this.connection = mysql.createConnection(config)
  }
  
  query(query, args, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {
      if (GET_COMPILED_QUERY) {
        return resolve(query)
      } else {
        this.connection.query(query, args, (err, rows) => {
          if (err) {
            reject(err)
          }
          resolve(rows)
        })
      }
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