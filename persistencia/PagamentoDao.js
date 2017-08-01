const mysql = require('mysql')

class PagamentoDao {
  constructor(connection) {
    this.connection = connection;
    }
  

  salva(pagamento, callback) {
    console.log(this.connection)
    this.connection.query('INSERT INTO pagamentos SET ?', pagamento, callback)
    this.connection.end()
  }

  lista(callback) {
    this.connection.query('SELECT * FROM pagamentos', callback)
    this.connection.end()
  }

  buscaPorId(id, callback) {
    this.connection.query('SELECT * FROM pagamentos WHERE id=?', [id], callback)
    this.connection.end()
  }
}

module.exports = function() {
  return PagamentoDao
}