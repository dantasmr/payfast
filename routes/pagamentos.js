const PagamentosController = require('../controllers/pagamentos')


module.exports = () => {
  const pagamentos = new PagamentosController()

  app.get("/pagamentos", pagamentosController.lista);
  app.post("/pagamentos", pagamentosController.salva);
}
