class PagamentoController {
  constructor(app) {
    this.app = app
  }

  lista(req, res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)

    pagamentoDao.lista((err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        console.log(err);
        res.status(404).json(err)
      }

    })
  }

  buscaPorId(req, res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)
    const id = req.params.id

    pagamentoDao.buscaPorId(id, (err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }
    })
  }

  salva(req, res) {
    const pagamento = req.body
    let errors = false
    pagamento.status = "CRIADO"
    pagamento.data = new Date

    req.assert('forma_de_pagamento', 'Chave forma_de_pagamento é obrigátoria').notEmpty()
    req.assert('valor', 'Chave valor é obrigátoria').notEmpty()
    req.assert('valor', 'Chave valor tem que ser um número decimal').isFloat()
    req.assert('moeda', 'Chave moeda é obrigatória').notEmpty()
    req.assert('moeda', 'Chave moeda deve ter 3 caracteres').len(3, 3)

    errors = req.validationErrors()

    if(!errors) {
      const connection = this.app.persistencia.connectionFactory()
      const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)

      pagamentoDao.salva(pagamento, (err, result, fields) => {
        if (!err) {
          const resposta = {
            data: pagamento,
            links:  this.app.config.links.getLinks(result.insertId)
          }
          res.status(201).json(resposta)
        } else {
          console.log(err);
          err.sql = ''
          res.status(400).json(err)
        }
      })
    } else {
      res.status(400).json(errors)
    }
  }
}

module.exports = function() {
  return PagamentoController
}