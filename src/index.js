import express from 'express'
import bodyParser from 'body-parser'

//=================FACTURA==================
import handleFacturaRequest from './facturas'
//==========================================
import adaptRequest from './helpers/adapt-request'

const app = express()
app.use(bodyParser.json())


//=================FACTURA==================
app.all('/factura', facturaController)
app.get('/factura/:id', facturaController)
//==========================================

//=================FACTURA==================
function facturaController (req, res) {
  const httpRequest = adaptRequest(req)
  handleFacturaRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => res.status(500).end())
}
//==========================================

app.listen(3000, () => console.log(`Listening on port 3000`))
