const faker = require('faker')
const { User, Project } = require('../db')
const { db } = require('../db/db')

const generateUsers = async () => {
    const fakeUsers = [{
        name: 'Jay',
        email: 'j@j.com',
        password: 123,
        admin: true,
        god: true
    }]
    for(let i = 0; i < 20; i++) {
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: 123,
        }
        fakeUsers.push(user)
    }
    try {
      await User.create(fakeUsers)
      return true
    } catch(e) {
      console.log(e)
    }
}

const generateProjects = async () => {
  const fakeProjects = []
  for(let i = 0; i < 20; i++) {
    let project = {
        title: faker.internet.domainName(),
        description: faker.lorem.paragraph(),
        dateCreated: faker.date.past(),
        technologies: [
          faker.company.companyName(),
          faker.company.companyName(),
        ],
        URL: faker.internet.domainName(),
        githubRepo: faker.internet.domainName(),
        screenshot: faker.image.imageUrl(),
        featured: (i * (8 * i) % 6) ? false : true,
    }
    fakeProjects.push(project)
  }
  try {
    await Project.create(fakeProjects)
    return true
  } catch (e) {
    console.log(e)
  }
}

const seed = async () => {
  try {
    await db.dropDatabase()
    await generateUsers()
    await generateProjects()
    return "DONE"
  } catch (e) {
    console.log(e);
  }
}

seed()
  .then(() => {
    process.exit(0)
  })
