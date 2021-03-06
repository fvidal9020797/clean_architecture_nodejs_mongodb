import makeFactura from './factura'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeFacturaList ({ database }) {
  return Object.freeze({
    add,
    // findByEmail,
    findById,
    getAll,
    // getItems,
    // remove,
    // replace,
    // update,
  })

  

  async function add ({ contactId, ...factura }) {
    const db = await database
    if (contactId) {
      contact._id = db.makeId(contactId)
    }
    const { result, ops } = await db
      .collection('facturas')
      .insertOne(factura)
      .catch(mongoError => {
        const [errorCode] = mongoError.message.split(' ')
        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          throw new UniqueConstraintError(
            // mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
          )
        }
        throw mongoError
      })
    return {
      success: result.ok === 1,
      created: ops[0]
    }
  }

  async function findById ({ _id }) {
    const db = await database
    const found = await db
      .collection('facturas')
      .findOne({ _id: db.makeId(_id) })
    if (found) {
      return found
    }
    return null
  }

  async function getAll () {
    const db = await database
    const results = await db
      .collection('facturas')
      .find()
      .toArray()
    return results
  }

  // todo:
  async function remove () {}

  // todo:
  async function replace (contact) {}

  // todo:
  async function update (contact) {}

  async function getItems (){}

  function documentToContact ({ _id: facturaId, ...doc }) {
    return makeFactura({ facturaId, ...doc })
  }
}
