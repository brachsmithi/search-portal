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
    .then((record) => {
      res.json({ 
        message: `Director \'${req.body.name}\' created.`,
        id: record
      })
    })
    .catch(err => {
      res.json({ message: `There was an error creating director ${req.body.name}: ${err}` })
    })
}

exports.directorFind = async (req, res) => {
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
  const response1 = await knex
    .delete('*')
    .from('directors')
    .then(data => {
      return data
    })
    .catch(err => {
      return `There was an error deleting directors: ${err}`
    })
  
  const response2 = await knex
    .delete('*')
    .from('program_directors')
    .then(data => {
      return data
    })
    .catch(err => {
      return `There was an error deleting program_directors: ${err}`
    })

  res.json({messages: [response1, response2]});
}

exports.programAdd = async (req, res) => {
  knex('program_directors')
    .insert({
      director_id: req.body.director_id,
      program_id: req.body.program_id
    })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: `There was an error deleting directors: ${err}` })
    })
}