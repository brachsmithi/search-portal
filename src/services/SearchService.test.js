import axios from 'axios'
import SearchService from './SearchService'

describe('SearchService', () => {

  beforeAll(async () => {
    const program = await axios.post("http://localhost:4001/programs/create", {
          title: "It! The Terror From Beyond Space",
          year: "1958",
          search_field: "It The Terror From Beyond Space"
        })
        .then(response => {
          return response.data;
        })
        .catch(error => console.error(error));
        
    const director = await axios.post("http://localhost:4001/directors/create", {
          name: "Edward L. Cahn"
        })
        .then(response => {
          return response.data;
        })
        .catch(error => console.error(error));
        
    await axios.post("http://localhost:4001/directors/addprogram", {
          director_id: director.id,
          program_id: program.id
        })
        .then(response => {
          return response.data;
        })
        .catch(error => console.error(error));
  });

  afterAll(async () => {
    await axios.post("http://localhost:4001/programs/deleteAll")
      .then(response => {
        return response.data;
      })
      .catch(error => console.error(error));
    await axios.post("http://localhost:4001/directors/deleteAll")
      .then(response => {
        return response.data;
      })
      .catch(error => console.error(error));
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

})
