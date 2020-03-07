import requiredParam from '../helpers/required-param'
import { InvalidPropertyError } from '../helpers/errors'
import isValidEmail from '../helpers/is-valid-email.js'
import upperFirst from '../helpers/upper-first'

export default function makeFactura (
  facturaInfo = requiredParam('facturaInfo')
) {
  const validFactura = validate(facturaInfo)
  const normalFactura = normalize(validFactura)
  return Object.freeze(normalFactura)

  function validate ({
    facturaId,
    nit = requiredParam('nit'),
    name = requiredParam('name'),
  } = {}) {
    validateCabezera('nit', nit)
    validateCabezera('name', name)
    return {nit, name }
  }

  function validateCabezera (label, name) {
    if (name.length < 5) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 5 characters long.`
      )
    }
  }


  function normalize ({  nit, name }) {
    return {
      nit,
      name//: upperFirst(lastName),
    }
  }
}
