import makeDb from '../db'
import makeFacturaList from './facturas-list'
import makeFacturaEndpointHandler from './facturas-endpoint'

const database = makeDb()
const facturaList = makeFacturaList({ database })
const facturaEndpointHandler = makeFacturaEndpointHandler({ facturaList })

export default facturaEndpointHandler
