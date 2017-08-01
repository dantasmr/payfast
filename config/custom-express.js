module.exports = function() {
  const express = require('express')
  const load = require('express-load')
  const bodyParser = require('body-parser')
  const app = express()
  const expressValidator = require('express-validator')

  app.use(bodyParser.json())
  app.use(expressValidator())

  load('controllers')
  .then('persistencia')
  .then('./config/links.js')
  .into(app)

  return app
}