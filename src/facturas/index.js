import makeDb from '../db'
import makeFacturaList from './facturas-list'
import makeDetalleFacturaList from './detalle-facturas-list'
import makeItemList from './item-use-case'
import makeFacturaEndpointHandler from './facturas-endpoint'

const database = makeDb()
const facturaList = makeFacturaList({ database })
const detalleFacturaList= makeDetalleFacturaList({database})
const itemList = makeItemList({database})
const facturaEndpointHandler = makeFacturaEndpointHandler({ facturaList,detalleFacturaList,itemList })

export default facturaEndpointHandler
