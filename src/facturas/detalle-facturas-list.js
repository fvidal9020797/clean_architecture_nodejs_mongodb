import makeDetalleFactura from './detalle-factura'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeDetalleFacturaList ({ database }) {
  return Object.freeze({
    add,
    findByIdFactura,
    // findById,
    // getItems,
    // remove,
    // replace,
    // update,
  })

  
  async function findByIdFactura ({idFactura}) {
    const db = await database
    const results = await db
      .collection('detalle_facturas')
      .find({ idFactura })
      .toArray()
    return results.map(documentToContact)
  }

  async function add ({ contactId, ...detalleFactura }) {
    const db = await database
    if (contactId) {
      contact._id = db.makeId(contactId)
    }
    detalleFactura.idItem=db.makeId(detalleFactura.idItem);
    const { result, ops } = await db
      .collection('detalle_facturas')
      .insertOne(detalleFactura)
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
      success: result.ok === 1
    }
  }
  // todo:
  async function getItems () {}

  // todo:
  async function findById () {}
  
  // todo:
  async function remove () {}

  // todo:
  async function replace (contact) {}

  // todo:
  async function update (contact) {}

  function documentToContact ({ _id: detalleFacturaId, ...doc }) {
    return makeDetalleFactura({ detalleFacturaId, ...doc })
  }
}
