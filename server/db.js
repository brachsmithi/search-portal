const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "programs"
knex.schema
  // Make sure no "programs" table exists
  // before trying to create new
  .hasTable('programs')
    .then((exists) => {
      if (!exists) {
        // If no "programs" table exists
        // create new, with "id", "title",
        // and "year" columnsds
        // and use "id" as a primary identification
        // and increment "id" with every new record (program)
        return knex.schema.createTable('programs', (table)  => {
          table.increments('id').primary()
          table.string('title')
          table.string('year')
          table.string('search_field')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Programs\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table programs: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

knex.schema
    .hasTable('directors')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('directors', (table)  => {
            table.increments('id').primary()
            table.string('name')
          })
          .then(() => {
            console.log('Table \'Directors\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating table directors: ${error}`)
          })
        }
      })
      .then(() => {
        console.log('done')
      })
      .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
      })

knex.schema
  .hasTable('alternate_titles')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('alternate_titles', (table)  => {
          table.increments('id').primary()
          table.string('title')
          table.integer('program_id')
        })
        .then(() => {
          console.log('Table \'Alternate Titles\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table alternate_titles: ${error}`)
        })
      }
    })
    .then(() => {
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

knex.schema
.hasTable('program_directors')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('program_directors', (table)  => {
        table.increments('id').primary()
        table.integer('program_id')
        table.integer('director_id')
      })
      .then(() => {
        console.log('Table \'Program Directors\' created')
      })
      .catch((error) => {
        console.error(`There was an error creating table program_directors: ${error}`)
      })
    }
  })
  .then(() => {
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Just for debugging purposes:
// Log all data in "books" table
knex.select('*').from('programs')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

knex.select('*').from('directors')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

knex.select('*').from('alternate_titles')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

knex.select('*').from('program_directors')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex