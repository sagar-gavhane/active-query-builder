# active-query-builder

Simple and flexible way to write your next MySQL queries.

## Badges

![Travis (.org)](https://img.shields.io/travis/sagar-gavhane/active-query-builder.svg?style=flat-square)
![npm](https://img.shields.io/npm/dm/active-query-builder.svg?style=flat-square)
![npm](https://img.shields.io/npm/v/active-query-builder.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/sagar-gavhane/active-query-builder.svg)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![GitHub issues](https://img.shields.io/github/issues/sagar-gavhane/active-query-builder.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sagar-gavhane/active-query-builder.svg)
![node](https://img.shields.io/badge/node-0.10.33-brightgreen.svg)
![GitHub contributors](https://img.shields.io/github/contributors/sagar-gavhane/active-query-builder.svg)

## The problem

Writting queries with [mysqljs](https://github.com/mysqljs/mysql) makes difficult because they doesn't supports you ES6 Promise feature and during working on project I found that same queries are repetative and required more keystrokes.

## This solution

I come with simple and flexible solution for writting repetative queries using active query builder. This pattern allows information to be retrieved, inserted, and updated in your database with minimal scripting. In some cases only one or two lines of code are necessary to perform a database action.

## Getting Started

This is package mainly designed for mysqljs. It's written in JavaScript, does not require compiling, and is 100% MIT licensed.

### Prerequisites

What things you need to install the software and how to install them

1. Node.js 8.10 or above
2. MYSQL community edition

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```bash
npm install mysqljs active-query-builder --save
```

## Running the tests

Tests gives us confidence, hence we have written tests for each method. Before creating pull request make sure that you have passed all tests

```bash
npm run test
```

## Contributing

Please read [CONTRIBUTING.md](/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

**Sagar Gavhane** - *core author*

See also the list of [contributors](https://github.com/sagar-gavhane/active-query-builder/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
