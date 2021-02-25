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
    .then((record) => {
      res.json({ 
        message: `Program \'${req.body.title}\' from ${req.body.year} created.`,
        id: record
      })
    })
    .catch(err => {
      res.json({ message: `There was an error creating program ${req.body.title}: ${err}` })
    })
}

exports.programFind = async (req, res) => {
  knex
    .select('*')
    .from('programs')
    .leftOuterJoin('program_directors', 'programs.id', 'program_directors.program_id')
    .leftOuterJoin('directors', 'program_directors.director_id', 'directors.id')
    .where('search_field', 'like', `%${req.body.search_text}%`)
    .then(data => {
      console.log(data)
      res.json(
        data.map((program) => {
          return {
            title: {
              name: program.title
            },
            year: program.year,
            director: {
              name: program.name
            }
          }
        })
      );
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving programs: ${err}` })
    })
}

exports.programsClear = async (req, res) => {
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