module.exports = (app) => {
  app.get('/pagamento', (req, res) => {
    res.send('JSON com todos os pagemntos')
  })

  app.post('/pagamento', (req, res) => {
    const pagamento = req.body
    const connection = app.persistencia.connectionFactory()
    const pagamentoDao = new app.persistencia.PagamentoDao(connection)

    pagamento.status = 'CRIADO'
    pagamento.date = new Date

    pagamentoDao.salva(pagamento, (err, result, fields) => {
      if (!err) {
        res.json(pagamento)
      }else{
        console.log(err)
      }
    })
  })
}