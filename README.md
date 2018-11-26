# active-query-builder

## **Motto**

Simple and flexible way to write your next MySQL queries.

## Badges

 ![npm](https://img.shields.io/npm/dm/active-query-builder.svg?style=flat-square) ![npm](https://img.shields.io/npm/v/active-query-builder.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/sagar-gavhane/active-query-builder.svg)![GitHub contributors](https://img.shields.io/github/contributors/sagar-gavhane/active-query-builder.svg)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![GitHub issues](https://img.shields.io/github/issues/sagar-gavhane/active-query-builder.svg) ![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sagar-gavhane/active-query-builder.svg) ![node](https://img.shields.io/badge/node-0.10.33-brightgreen.svg) 

## The problem

Writing queries with [mysql](https://github.com/mysqljs/mysql) makes difficult because it doesn't supports ES6 Promise and during working on project I found that same queries are repetitive.

## This solution

I come with simple and flexible solution for writing repetitive queries using active query builder. This pattern allows information to be retrieved, inserted, and updated in your database with minimal scripting. In some cases only one or two lines of code are necessary to perform a database action.

## Getting Started

This is package mainly designed for MySQL. It's written in JavaScript, does not require compiling, and is 100% MIT licensed.

```javascript
const ActiveQueryBuilder = require('active-query-builder')

// make connection to your database
const conn = new ActiveQueryBuilder({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sandbox',
})

// query method
conn.query('SELECT * FROM person WHERE email=?', ['john@domain.com'])
  .then(({results, fields, query}) => {
    console.log(results) // this is your result
  })

// get method
conn.get('users').then(({results, fields, query}) => {
  console.log(results) // this is your result
})

// get_where method
conn.get_where('users', { 'email': 'john@domain.com' })
  .then(({ results, fields, query }) => {
    console.log(results) // this is your result
  })
```

### Prerequisites

What things you need to install the software and how to install them

1. Node 8.10 or above
2. MySQL community edition

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```bash
npm install mysql active-query-builder --save
```

## Running the tests

Tests gives us confidence, hence we have written tests for each method. Before creating pull request make sure that you have passed all tests

```bash
npm run test
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/sagar-gavhane/active-query-builder/tree/d506a2ad1bfff5c1be6364f409b7b3c0104c1fe5/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

[Sagar Gavhane](https://www.twitter.com/sagar_dev44) - _core author_

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/sagar-gavhane/active-query-builder/tree/d506a2ad1bfff5c1be6364f409b7b3c0104c1fe5/LICENSE.md) file for details

