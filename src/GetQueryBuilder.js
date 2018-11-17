const isNumber = require('lodash/isNumber')

/**
 * @todo Write tests for GetQueryBuilder class
 * @body To make code reliable we have to add tests for GetQueryBuilder class
 */
class GetQueryBuilder {
  get(tableName, limit = null, offset = null, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${tableName}`

      if (isNumber(limit) && !isNumber(offset)) {
        query = `${query} LIMIT ${limit}`
      } else if (isNumber(limit) && isNumber(offset)) {
        query = `${query} LIMIT ${limit},${offset}`
      }

      if (GET_COMPILED_QUERY) {
        resolve(query)
      } else {
        this.connection.query(query, (err, rows) => {
          if (err) {
            reject(err)
          }
          resolve(rows)
        })
      }
    })
  }

  get_where(tableName, matcher, limit, offset, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${tableName} WHERE`
      let where_clause = ''
      let counter = 1
      const totalKeys = Object.keys(matcher).length

      for (const key in matcher) {
        where_clause = `${where_clause}${key}="${matcher[key]}"`
        if (totalKeys > counter) {
          where_clause = `${where_clause} OR `
        }
        counter++
      }
      query = `${query} ${where_clause} LIMIT ${limit},${offset}`

      if (GET_COMPILED_QUERY) {
        resolve(query)
      }

      this.connection.query(query, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}

module.exports = GetQueryBuilder
