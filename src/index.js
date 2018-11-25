const mysql = require( 'mysql')
const {
  isNaN,
  isString,
  isEmpty,
  isBoolean,
  isObject,
  isArray,
} = require('lodash')

/**
 * ActiveQueryBuilder class allows information to be retrieved, inserted, and updated in your database with minimal scripting.
 * In some cases only one or two lines of code are necessary to perform a database action.
 *
 * @since 1.0.0
 * @class ActiveQueryBuilder
 * @constructor config provide your database configuration
 * @returns void
 */
class ActiveQueryBuilder {
  constructor(config) {
    this.connection = mysql.createConnection(config)
  }

  /**
   * Query method for performing your plain MySQL queries. Its absolutly similar to mysqljs query method.
   *
   * @since 1.0.0
   * @param {String} query MySQL valid query
   * @param {Any} args Pass valid arguments to query method
   * @param {Boolean} GET_COMPILED_QUERY Set to true if you want to debug your query
   * @returns {Promise} Return ES6 promise
   */
  query(query, args, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {
      if (GET_COMPILED_QUERY) {
        return resolve(query)
      } else {
        this.connection.query(query, args, (err, results, fields) => {
          if (err) {
            reject(err)
          }
          resolve({ results, fields })
        })
      }
    })
  }

  /**
   * Get method allow you build SQL SELECT statements.
   * Runs the selection query and returns the ES6 Promise. Can be used by itself to retrieve all records from a specific table.
   *
   * @since 1.0.3
   * @param {String} tableName Table name for performing MySQL query
   * @param {Number} limit Limit parameter enable you to set limit clause on select query.
   * @param {Number} offset Offset parameter enable you to set offset clause on select query.
   * @param {Boolean} GET_COMPILED_QUERY Compiles the selection query but does not run the query. This method simply returns the MySQL query as a string. Helpful for debug MySQL query.
   */
  get(tableName = '', limit = null, offset = null, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {

      if (isString(tableName) && !isEmpty(tableName)) {
        let query = `SELECT * FROM ${tableName}`

        const _limit = limit < 0 ? parseInt(limit) * -1 : parseInt(limit)
        const _offset = offset < 0 ? parseInt(offset) * -1 : parseInt(offset)

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
            resolve({ results, rows, query })
          })
        } else {
          resolve({ results: [], rows: {}, query })
        }
      } else {
        throw new Error('Table name should be valid non empty string.')
      }
    })
  }

  /**
   * Get method allow you build SQL SELECT statements with WHERE clause.
   * Identical to the above get method except that it permits you to add a “WHERE clause in the second parameter.
   *
   * @since 1.0.3
   * @param {String} tableName Table name for performing MySQL query.
   * @param {Object|Array} matcher Matcher for writting WHERE clause.
   * @param {Number} limit Limit parameter enable you to set limit clause on select query.
   * @param {Number} offset Offset parameter enable you to set offset clause on select query.
   * @param {Boolean} GET_COMPILED_QUERY Compiles the selection query but does not run the query. This method simply returns the MySQL query as a string. Helpful for debug MySQL query.
   * @returns Return ES6 promise
   */
  get_where(tableName, matcher = {}, limit = null, offset = null, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {

      if (isString(tableName) && !isEmpty(tableName)) {
        let query = `SELECT * FROM ${tableName}`

        if (isObject(matcher) && !isEmpty(matcher)) {
          let where_clause = 'WHERE '
          let counter = 1
          const totalKeys = Object.keys(matcher).length

          for (const key in matcher) {
            where_clause = `${where_clause}${key}='${matcher[key]}'`
            if (totalKeys > counter) {
              where_clause = `${where_clause} OR `
            }
            counter++
          }
          query = `${query} ${where_clause}`
        }

        const _limit = limit < 0 ? parseInt(limit) * -1 : parseInt(limit)
        const _offset = offset < 0 ? parseInt(offset) * -1 : parseInt(offset)

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
            resolve({ results, rows, query })
          })
        } else {
          resolve({ results: [], rows: {}, query })
        }
      } else {
        throw new Error('Table name should be valid non empty string.')
      }
    })
  }

  /**
   * Insert method generates an insert string based on the setters you supply, and runs the query.
   * You can either pass an array or an object to the this method.
   *
   * @since 1.0.5
   * @param {String} tableName Table name for performing MySQL query
   * @param {Object | Array} setter Pass an array or an object to the this method for data insertion.
   * @param {Boolean} GET_COMPILED_QUERY Set to true if you want to debug your query
   * @returns {Promise} Return ES6 promise
   */
  insert(tableName, setter, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {

      if (isString(tableName) && !isEmpty(tableName)) {
        if ((isObject(setter) || isArray(setter)) && !isEmpty(setter)) {
          const query = `INSERT INTO ${tableName} SET ?`

          if (isBoolean(GET_COMPILED_QUERY) && !GET_COMPILED_QUERY) {
            this.connection.query(query, setter, (err, results, rows) => {
              if (err) {
                reject(err)
              }
              resolve({ results, rows, query })
            })
          } else {
            resolve({ results: [], rows: {}, query })
          }
        } else {
          throw new Error('Invalid data passed')
        }
      }  else {
        throw new Error('Table name should be valid non empty string.')
      }
    })
  }

  /**
   * Insert batch method generates an insert string MySQL query based on the data you supply, and runs the query.
   *
   * @since 1.0.5
   * @param {String} tableName Table name for performing MySQL query
   * @param {Array} keys Keys or fields name of selected table
   * @param {Array} setter Pass an array or an object to the this method for data insertion.
   * @param {Boolean} GET_COMPILED_QUERY Set to true if you want to debug your query
   * @returns {Promise} Return ES6 promise
   */
  insert_batch(tableName, keys, setter, GET_COMPILED_QUERY = false){
    return new Promise((resolve, reject) => {

      if (isString(tableName) && !isEmpty(tableName)) {
        if (isObject(keys) && isArray(setter) && !isEmpty(setter)) {
          const query = `INSERT INTO ${tableName} (${keys}) VALUES ?`

          if (isBoolean(GET_COMPILED_QUERY) && !GET_COMPILED_QUERY) {
            this.connection.query(query, [setter], (err, results, rows) => {
              if (err) {
                reject(err)
              }
              resolve({ results, rows, query })
            })
          } else {
            resolve({ results: [], rows: {}, query })
          }
        } else {
          throw new Error('Invalid data passed')
        }
      } else {
        throw new Error('Table name should be valid non empty string.')
      }
    })
  }

  update(tableName, setter, matcher, GET_COMPILED_QUERY = false) {
    return new Promise((resolve, reject) => {
      let query = `UPDATE ${tableName} SET`
      let set = ''
      let where_clause = 'WHERE'
      let args = []
      let counter = 1
      const totalKeys = Object.keys(matcher).length

      for (const setterKey in setter) {
        if (totalKeys > counter) {
          set = `${set} ${setterKey}=?,`
        } else {
          set = `${set} ${setterKey}=?`
        }
        args.push(setter[setterKey])
      }

      for (const matcherKey in matcher) {
        where_clause = `${where_clause} ${matcherKey}=${matcher[matcherKey]}`
      }
      query = `${query}${set} ${where_clause}`
      this.query(query, args).then(response => {
        resolve({query, args, response})
      })
    })
  }

  /**
   * Close your connection
   *
   * @since 1.0.0
   * @returns Return ES6 promise
   */
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

module.exports = ActiveQueryBuilder
