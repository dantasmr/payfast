// httpstatuses.com
// httpstatusdogs.com

module.exports = (app) => {
  app.get('/pagamento', (req, res) => {
    const connection = app.persistencia.connectionFactory()
    const pagamentoDao = new app.persistencia.PagamentoDao(connection)

    pagamentoDao.lista((err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }

    })
  })

  app.get('/pagamento/:id', (req, res) => {
    const connection = app.persistencia.connectionFactory()
    const pagamentoDao = new app.persistencia.PagamentoDao(connection)
    const id = req.params.id

    pagamentoDao.buscaPorId(id, (err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }
    })
  })

  app.post('/pagamento', (req, res) => {
    const pagamento = req.body
    let errors = false;
    pagamento.status = "CRIADO"
    pagamento.data = new Date

    req.assert('forma_de_pagamento', 'Chave forma_de_pagamento é obrigátoria').notEmpty()
    req.assert('valor', 'Chave valor é obrigátoria').notEmpty()
    req.assert('valor', 'Chave valor tem que ser um número decimal').isFloat()
    req.assert('moeda', 'Chave moeda é obrigatória').notEmpty()
    req.assert('moeda', 'Chave moeda deve ter 3 caracteres').len(3, 3)

    errors = req.validationErrors()

    if(!errors) {
      const connection = app.persistencia.connectionFactory()
      const pagamentoDao = new app.persistencia.PagamentoDao(connection)

      



      pagamentoDao.salva(pagamento, (err, result, fields) => {
        if (!err) {
          const resposta = {
            data: pagamento,
            links: app.config.links.getLinks(result.insertId)            
          }
          res.status(201).json(resposta)
        } else {
          err.sql = ''
          res.status(400).json(err)
        }
      })
    } else {
      res.status(400).json(errors)
    }
  })
}