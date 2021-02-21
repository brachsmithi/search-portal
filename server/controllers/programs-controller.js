const knex = require('./../db')

exports.programsAll = async (req, res) => {
  knex
    .select('*')
    .from('programs')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving programs: ${err}` })
    })
}