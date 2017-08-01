module.exports = function() {
  const express = require('express')
  const load = require('express-load')
  const bodyParser = require('body-parser')
  const app = express()

  app.use(bodyParser.json())

  load('controllers').then('persistencia').into(app)

  return app
}