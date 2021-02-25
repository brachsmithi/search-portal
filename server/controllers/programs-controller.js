const knex = require('./../db')

exports.programsAll = async (req, res) => {
  knex
    .select('*')
    .from('programs')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving programs: ${err}` })
    })
}

exports.programCreate = async (req, res) => {
  knex('programs')
    .insert({
      'title': req.body.title,
      'year': req.body.year,
      'search_field': req.body.search_field
    })
    .then(() => {
      res.json({ message: `Program \'${req.body.title}\' from ${req.body.year} created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating program ${req.body.title}: ${err}` })
    })
}

exports.programFind = async (req, res) => {
  console.log(req)
  knex
    .select('*')
    .from('programs')
    .where('search_field', 'like', `%${req.body.search_text}%`)
    .then(data => {
      res.json(
        data.map((program) => {
          return {
            title: {
              name: program.title
            },
            year: program.year
          }
        })
      );
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving programs: ${err}` })
    })
}

exports.programsClear = async (req, res) => {
  console.log(req)
  knex
    .delete('*')
    .from('programs')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: `There was an error deleting programs: ${err}` })
    })
}