require('dotenv').config()
const mysql = require( 'mysql')
const {
  isNaN,
  isString,
  isEmpty,
  isBoolean,
  isObject,
} = require('lodash')

class ActiveQueryBuilder {
  constructor(config) {
    this.connection = mysql.createConnection(config)
  }

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
