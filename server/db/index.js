const User = require('./user')
const Project = require('./projects')
const BlogPost = require('./blog')
let Seeder;

if(process.env.NODE_ENV == 'test') {
    const TestSeeder = require('../../testUtility/Seeder')
    Seeder = new TestSeeder()
    const collections = [
        {name:'user', collection: User},
        {name: 'project', collection: Project},
        {name: 'blogPost', collection: BlogPost}
    ]
    Seeder.addManyCollections(collections)
}


module.exports = {
    User,
    Project,
    BlogPost,
    Seeder
}