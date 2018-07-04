const faker = require('faker')
import { User, Project, BlogPost, seeder } from '../db/index'
import  { db } from '../db/db'
import { Value } from 'slate'

const postVal = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'title',
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra enim lorem, non bibendum nulla egestas eu. Donec auctor, nunc nec dapibus ultricies, magna ex sodales diam, a mattis massa ante suscipit nunc. Curabitur rhoncus felis elementum, facilisis ante nec, interdum sem.'
              },
            ],
          },
        ],
      },
    ],
  }
})

const tech = [
  'ReactNative',
  'PostgreSQL',
  'JavaScript',
  'MongoDB',
  'Node.js',
  'Webpack',
  'React',
  'Redux',
]

const getRandomTech = (n) => {
  let techArr = []
  for(let i = 0; i < n; i++) {
    let ranNum = Math.floor(Math.random() * ((tech.length - 1) - 0) + 1)
    techArr.push(tech[ranNum])
  }
  return techArr
}

const generateBlogPosts = async () => {
  await seeder.blogPost.removeAll()
  let author = await seeder.user.create('author', {name: 'mayra', email: 'm@m.com', password: '123', admin: true})
  author = author.doc

  const fakeBlogPosts = [{
    title: 'Fake Blog',
    author: author._id,
    body: JSON.stringify(postVal.toJSON()),
  }]

  for(let i = 0; i < 10; i++) {
    let post = {
      title: faker.name.findName(),
      author: author._id,
      body: JSON.stringify(postVal.toJSON()),
      thumbnail: faker.image.imageUrl(),
      preview: 'simple Privew'
    }
    fakeBlogPosts.push(post)
  }
  try {
    await BlogPost.create(fakeBlogPosts)
    return true
  } catch (e) {
    console.log(e)
  }
}

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
            admin: false,
            god: false
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
        technologies: getRandomTech(4),
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
    await generateBlogPosts()
    return "DONE"
  } catch (e) {
    console.log(e);
  }
}

seed()
  .then(() => {
    process.exit(0)
  })
