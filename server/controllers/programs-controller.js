const { from } = require('./../db');
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
    });
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
    });
}

exports.alternateTitles = async(program_id) => {
  return knex 
    .select('title')
    .from('alternate_titles')
    .where('program_id', program_id)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(`There was an error retrieving programs: ${err}`)
      return [];
    });
}

exports.programFind = async (req, res) => {
  const programs = await knex
    .select('*')
    .from('programs')
    .where('search_field', 'like', `%${req.body.search_text}%`)
    .leftOuterJoin('program_directors', 'programs.id', 'program_directors.program_id')
    .leftOuterJoin('directors', 'program_directors.director_id', 'directors.id')
    .then(data => {
      return data.map((program) => {
        return {
          id: program.program_id,
          title: {
            name: program.title,
            alternateTitles: []
          },
          year: program.year,
          director: {
            name: program.name
          }
        }
      });
    })
    .catch(err => {
      return `There was an error retrieving programs: ${err}`
    });
  if (programs[0]) {
    await knex 
      .select('*')
      .from('alternate_titles')
      .where('program_id', programs[0].id)
      .then(data => {
        programs[0].title.alternateTitles = data.map(at => at.title);
      })
      .catch(err => {
        console.log(`There was an error retrieving programs: ${err}`)
      });
  }
  return res.json(programs);
}

exports.programsClear = async (req, res) => {
  const response1 = knex
    .delete('*')
    .from('programs')
    .then(data => {
      return data
    })
    .catch(err => {
      return `There was an error deleting programs: ${err}`
    });

  const response2 = knex
    .delete('*')
    .from('alternate_titles')
    .then(data => {
      return data
    })
    .catch(err => {
      return `There was an error deleting alternate program titles: ${err}`
    });

  res.json({messages: [response1, response2]});
}

exports.programCreateAlternateTitle = async (req, res) => {
  knex('alternate_titles')
    .insert({
      'title': req.body.title,
      'program_id': req.body.id
    })
    .then((record) => {
      res.json({ 
        message: `Alternate program title \'${req.body.title}\' created.`,
        id: record
      })
    })
    .catch(err => {
      res.json({ message: `There was an error creating alternate program title ${req.body.title}: ${err}` })
    });
}