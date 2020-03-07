import requiredParam from '../helpers/required-param'
import { InvalidPropertyError } from '../helpers/errors'

export default function makeDetalleFactura (
  detalleFacturaInfo = requiredParam('detalleFacturaInfo')
) {
  const validDetalleFactura = validate(detalleFacturaInfo)
  const normalDetalleFactura = normalize(validDetalleFactura)
  return normalDetalleFactura;
  // return Object.freeze(normalDetalleFactura)

  function validate ({
    idFactura,
    idItem,
    precio=requiredParam('precio'),
    cantidad=requiredParam('cantidad'),
    total=precio*cantidad
  } = {}) {
    // validateCabezera('id_factura', idFactura)
    // validateCabezera('name', name)
    return { idFactura, idItem, precio, cantidad, total }
  }

  function validateCabezera (label, name) {
    if (name.length < 5) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 5 characters long.`
      )
    }
  }

  function normalize ({ idFactura,  idItem, precio, cantidad, total }) {
    return {
      idFactura,
      idItem,//: upperFirst(lastName),
      precio, 
      cantidad,
      total
    }
  }
}
