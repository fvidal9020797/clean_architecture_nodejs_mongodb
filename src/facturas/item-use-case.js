// import makeFactura from './factura'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeItemList ({ database }) {
  return Object.freeze({
    // add,
    // findByEmail,
    findById,
    // getAll,
    // getItems,
    // remove,
    // replace,
    // update,
  })

  async function getItems (){}

  async function add () {}
    
  async function findById ({ _id }) {
    const db = await database
    const found = await db
      .collection('item')
      .findOne({ _id: db.makeId(_id) })
    if (found) {
      return found
    }
    return null
  }

  // todo:
  async function replace (contact) {}

  // todo:
  async function update (contact) {}

  function documentToContact ({ _id: facturaId, ...doc }) {
    return makeFactura({ facturaId, ...doc })
  }
}
