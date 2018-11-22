const {
  isNaN,
  isString,
  isEmpty,
  isBoolean
} = require('lodash')

class GetQueryBuilder {
  get(tableName = '', limit = null, offset = null, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {

      if (isString(tableName) && !isEmpty(tableName)) {
        let query = `SELECT * FROM ${tableName}`

        const _limit = parseInt(Math.abs(limit), 10)
        const _offset = parseInt(Math.abs(offset), 10)

        if (!isNaN(_limit)) {
          if (isNaN(_offset)) {
            query = `${query} LIMIT ${_limit}`
          } else {
            query = `${query} LIMIT ${_limit},${_offset}`
          }
        }

        if (isBoolean(GET_COMPILED_QUERY) && !GET_COMPILED_QUERY) {
          this.connection.query(query, (err, results, rows) => {
            if (err) {
              reject(err)
            }
            resolve({ results, rows })
          })
        } else {
          resolve({ query })
        }
      } else {
        throw new Error('Table name should be valid non empty string.')
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
