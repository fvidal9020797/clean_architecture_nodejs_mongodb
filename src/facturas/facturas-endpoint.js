import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../helpers/errors'
import makeHttpError from '../helpers/http-error'
import makeFactura from './factura'

export default function makeFacturaEndpointHandler ({ facturaList }) {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postFactura(httpRequest)

      case 'GET':
        return getContacts(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  }

  async function getContacts (httpRequest) {
    const { id } = httpRequest.pathParams || {}
    const { max, before, after } = httpRequest.queryParams || {}

    const result = id
      ? await contactList.findById({ contactId: id })
      : await contactList.getItems({ max, before, after })
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
    }
  }

  async function postFactura (httpRequest) {
    let facturaInfo = httpRequest.body
    if (!facturaInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
      try {
        facturaInfo = JSON.parse(facturaInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        })
      }
    }

    try {
      const factura = makeFactura(facturaInfo)
      const result = await facturaList.add(factura)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      }
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
              ? 400
              : 500
      })
    }
  }
}
