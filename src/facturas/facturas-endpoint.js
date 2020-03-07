import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../helpers/errors'
import makeHttpError from '../helpers/http-error'
import makeFactura from './factura'
import makeDetalleFactura from './detalle-factura'

export default function makeFacturaEndpointHandler ({ facturaList, detalleFacturaList, itemList }) {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postFactura(httpRequest)

      case 'GET':
        return getFactura(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  }

  async function getFactura (httpRequest) {
    const { id } = httpRequest.pathParams || {}
    if(id){
    // const { max, before, after } = httpRequest.queryParams || {}
      const result = await facturaList.findById({ _id: id })
      const listDetalleFactura=await detalleFacturaList.findByIdFactura({idFactura: result._id});
      for (const key in listDetalleFactura) {
        if (listDetalleFactura.hasOwnProperty(key)) {
          const element = listDetalleFactura[key];
          const item= await itemList.findById({_id: element.idItem});  
          listDetalleFactura[key].item= item;
        }
      }
      result.detalle_factura= listDetalleFactura;
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      }
    }else{
       const result = await facturaList.getAll()
       for (const key in result) {
         if (result.hasOwnProperty(key)) {
           const element = result[key];
           const listDetalleFactura=  await detalleFacturaList.findByIdFactura({idFactura: element._id});  
            for (const keyAux in listDetalleFactura) {
              if (listDetalleFactura.hasOwnProperty(keyAux)) {
                const element = listDetalleFactura[keyAux];
                const item= await itemList.findById({_id: element.idItem});  
                listDetalleFactura[keyAux].item= item;        
              }
            }

           result[key].detalle_factura=listDetalleFactura;
         }
       }
       return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      }
    }
    // const { max, before, after } = httpRequest.queryParams || {}
    
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
      for (const key in facturaInfo['detalle_factura']) {
        if (facturaInfo['detalle_factura'].hasOwnProperty(key)) {
          const detalleFactura=makeDetalleFactura(facturaInfo['detalle_factura'][key]);
          detalleFactura['idFactura']=result.created._id;
          await detalleFacturaList.add(detalleFactura)
        }
      }
      result.created.detalle_factura= await detalleFacturaList.findByIdFactura({idFactura: result.created._id});

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
