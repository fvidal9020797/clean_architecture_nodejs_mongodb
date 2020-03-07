import mongodb from 'mongodb'

export default async function makeDb () {
  const MongoClient = mongodb.MongoClient
  // const url = 'mongodb://localhost:27017'
  const url = 'mongodb+srv://fox_project:fF7eA1oipKDzwdid@cluster0-knd12.mongodb.net/test?retryWrites=true&w=majority'
  const dbName = 'clean_architecuture_invoice'
  const client = new MongoClient(url, { useNewUrlParser: true })
  await client.connect()
  const db = await client.db(dbName)
  db.makeId = makeIdFromString
  return db
}
function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}
