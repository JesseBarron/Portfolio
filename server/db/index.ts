import User from './user'
import Project from './projects'
import BlogPost from './blog'

const Seeder = require('mango-seed')


// if(process.env.NODE_ENV != 'production') {
    const faker = require('faker')
    export const seeder = new Seeder()
    
    const userTemplate = {
        name: faker.name.firstName,
        email: faker.internet.email,
        password: faker.internet.password
    }
    const projectTemplate = {
        title: faker.internet.domainWord,
        description: faker.name.jobDescriptor,
        technologies: ['ReactNative', 'Node.js', 'React'],
        URL: faker.internet.url,
        githubRepo: faker.internet.url,
        screenshot: faker.image.imageUrl
    }
    const blogTemplate = {
        title: faker.name.title,
    }
    const models = [
        {name:'user', model: User},
        {name: 'project', model: Project},
        {name: 'blogPost', model: BlogPost}
    ]
    seeder.addManyModels(models)
    seeder.user.setTemplate(userTemplate)
    seeder.project.setTemplate(projectTemplate)
    seeder.blogPost.setTemplate(blogTemplate)
// }

export { default as User } from './user'
export { default as Project } from './projects'
export { default as BlogPost } from './blog'
