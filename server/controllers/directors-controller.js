const knex = require('../db')

exports.directorsAll = async (req, res) => {
  knex
    .select('*')
    .from('directors')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving director: ${err}` })
    })
}

exports.directorCreate = async (req, res) => {
  knex('directors')
    .insert({
      'name': req.body.name
    })
    .then(() => {
      res.json({ message: `Director \'${req.body.name}\' created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating director ${req.body.name}: ${err}` })
    })
}

exports.directorFind = async (req, res) => {
  console.log(req)
  knex
    .select('*')
    .from('directors')
    .where('id', req.body.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving director: ${err}` })
    })
}

exports.directorsClear = async (req, res) => {
  console.log(req)
  knex
    .delete('*')
    .from('directors')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: `There was an error deleting directors: ${err}` })
    })
}