/**
 * This should be a class that has an object of colleciton names
 * Each name has the value of the corresponding collection
 * 
 * The class Should be able to add and remove collections to the array
 * 
 * The class Should then be able to do everything you whould want to do
 * with each collection, add, remove, update, query
 * and return the results....
 * 
 * 
 * The goal of the class is to help create dummy data
 * that is required to test dependant collections in the database
 * 
 * It has to be simple to use too, just call the class with the corresponding
 *  await ClassInstance.Collection.command({ document }, Options?)
 * 
 * In order to make things a little easer the user should be able to predefine some
 * dummy data to call later, this will save new instance to the database
 * and return the details of the initial data used to create the instance.
 * 
 * this way there's less clutter in the testing files!
 */

class TestCollection {
    constructor(name, collection) {
        if(!name) {
            throw new Error("addCollection must have a name addCollection(name, collection)")
        }
        if(!collection) {
            throw new Error('addCollection must be given a collection addCollection(name, collection)')
        }
        this.name = name
        this.collection = collection 
    }
    log() {
        console.log(this.name)
        console.log(this.collection)
    }
}

class TestSeeder {
    constructor() {}

    addManyCollections(collections) {
        collections.forEach((e, i) => {
            this[e.name] = new TestCollection(e.name, e.collection)
        })
    }
    addCollection(name, collection) {
        this.name = new testCollection(name, collection)
    }

    removeCollection(name) {
        delete this.name
    }

}

module.exports = TestSeeder