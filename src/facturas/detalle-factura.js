import requiredParam from '../helpers/required-param'
import { InvalidPropertyError } from '../helpers/errors'
import isValidEmail from '../helpers/is-valid-email.js'
import upperFirst from '../helpers/upper-first'

export default function makeDetalleFactura (
  detalleFacturaInfo = requiredParam('detalleFacturaInfo')
) {
  const validDetalleFactura = validate(detalleFacturaInfo)
  const normalDetalleFactura = normalize(validDetalleFactura)
  return Object.freeze(normalDetalleFactura)

  function validate ({
    idFactura = requiredParam('id_factura'),
    idItem = requiredParam('id_item'),
    precio=requiredParam('precio'),
    cantidad=requiredParam('cantidad'),
    total=requiredParam('total')
  } = {}) {
    validateCabezera('nit', nit)
    validateCabezera('name', name)
    return { nit, name }
  }

  function validateCabezera (label, name) {
    if (name.length < 5) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 5 characters long.`
      )
    }
  }


  function normalize ({ nit, name }) {
    return {
      nit,
      name//: upperFirst(lastName),
    }
  }
}
