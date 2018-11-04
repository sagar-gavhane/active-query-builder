const faker = require('faker')

beforeAll(() => {
  console.log('perform actions')
  for (let i = 0; i < 10; i++) {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const email = faker.internet.email()
    const city = faker.address.city()
    const zipcode = faker.address.zipCode()
    const phone = faker.phone.phoneNumber()
    const website = faker.internet.domainName()
    const placeholder = [
      name,
      email,
      city,
      zipcode,
      phone,
      website
    ]
    con.query("DELETE FROM users", () => {
      con.query('INSERT INTO users(name, email, city, zipcode, phone, website) VALUES(?,?,?,?,?,?)', [...placeholder]).then(row => {
        console.log(`user successfully inserted.`)
        console.log('-'.repeat(50))
      })
    })
  }
})

describe('get query check', () => {
  test('get query testing', () => {
    expect(true).toBe(true)
  })
})