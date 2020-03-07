import express from 'express'
import bodyParser from 'body-parser'
import handleContactsRequest from './contacts'
//=================FACTURA==================
import handleFacturaRequest from './facturas'
//==========================================
import adaptRequest from './helpers/adapt-request'

const app = express()
app.use(bodyParser.json())

app.all('/contacts', contactsController)
app.get('/contacts/:id', contactsController)

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

function contactsController (req, res) {
  const httpRequest = adaptRequest(req)
  handleContactsRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.listen(3000, () => console.log(`Listening on port 3000`))
