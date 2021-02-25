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
      search_field: 'Planet of the Vampires The Demon Planet'
    });
        
    const director1 = await postToDb('directors/create', {
      name: 'Edward L. Cahn'
    });

    await postToDb('directors/addprogram', {
      director_id: director1.id,
      program_id: program1.id
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

  async function postToDb(path, data) {
    return await axios.post(`http://localhost:4001/${path}`, data)
        .then(response => {
          return response.data;
        })
        .catch(error => console.error(error));
  };

})
