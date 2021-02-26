import axios from 'axios'
import SearchService from './SearchService'

describe('SearchService', () => {

  beforeAll(async () => {
    const program1 = await postToDb('programs/create', {
      title: 'It! The Terror From Beyond Space',
      year: '1958',
      search_field: 'It The Terror From Beyond Space'
    });

    const program2 = await postToDb('programs/create', {
      title: 'Planet of the Vampires',
      year: '1965',
      search_field: 'Planet of the Vampires The Demon Planet Planet of Blood Space Mutants Terror in Space The Haunted Planet The Haunted World The Outlawed Planet The Planet of Terror The Planet of the Damned'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'The Demon Planet'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'Planet of Blood'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'Space Mutants'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'Terror in Space'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'The Haunted Planet'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'The Haunted World'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'The Outlawed Planet'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'The Planet of Terror'
    });

    await postToDb('programs/addtitle', {
      id: program2.id,
      title: 'The Planet of the Damned'
    });
        
    const director1 = await postToDb('directors/create', {
      name: 'Edward L. Cahn'
    });
        
    const director2 = await postToDb('directors/create', {
      name: 'Mario Bava'
    });

    await postToDb('directors/addalias', {
      director_id: director2.id,
      alias: 'John M. Old'
    });

    await postToDb('directors/addalias', {
      director_id: director2.id,
      alias: 'Mickey Lion'
    });

    await postToDb('directors/addalias', {
      director_id: director2.id,
      alias: 'John Hold'
    });

    await postToDb('directors/addprogram', {
      director_id: director1.id,
      program_id: program1.id
    });

    await postToDb('directors/addprogram', {
      director_id: director2.id,
      program_id: program2.id
    });
  });

  afterAll(async () => {
    await postToDb('programs/deleteAll');
    await postToDb('directors/deleteAll');
  })
  
  it ('will test empty results', async () => {
    const service = new SearchService();
    const progs = await service.findProgram("foo");

    expect(progs).toHaveLength(0);
  });

  it ('finds simple program', async () => {
    const service = new SearchService();
    const progs = await service.findProgram("Beyond Space");
  
    expect(progs).toHaveLength(1);
    const program = progs[0];
    expect(program.title.name).toEqual("It! The Terror From Beyond Space");
    expect(program.year).toEqual("1958");
    expect(program.director.name).toEqual("Edward L. Cahn")
  });

  it ('finds program with alternate titles and director aliases', async () => {
    const service = new SearchService();
    const progs = await service.findProgram("Demon");
  
    expect(progs).toHaveLength(1);
    const program = progs[0];

    expect(program.title.name).toEqual("Planet of the Vampires");
    expect(program.title.alternateTitles).toHaveLength(9)
    expect(program.year).toEqual("1965");
    expect(program.director.name).toEqual("Mario Bava")
    expect(program.director.aliases).toHaveLength(3)
  });

  async function postToDb(path, data) {
    return await axios.post(`http://localhost:4001/${path}`, data)
        .then(response => {
          return response.data;
        })
        .catch(error => console.error(error));
  };

})
