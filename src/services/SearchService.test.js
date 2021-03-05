import SearchService from './SearchService'

describe('SearchService', () => {

  const mockResponse = JSON.stringify(
    {
      program: [
        {
          title: [
            "It! The Terror From Beyond Space"
          ],
          year: "1958",
          director: [
            {
              name: "Edward L. Cahn"
            }
          ],
          search_field: "It The Terror From Beyond Space"
        },
        {
          title: [
            "Planet of the Vampires",
            "The Demon Planet",
            "Planet of Blood",
            "Space Mutants",
            "Terror in Space",
            "The Haunted Planet",
            "The Haunted World",
            "The Outlawed Planet",
            "The Planet of Terror",
            "The Planet of the Damned"
          ],
          year: "1965",
          director: [
            {
              name: "Mario Bava",
              alias: [
                "John M. Old",
                "Mickey Lion",
                "John Hold"
              ]
            }
          ],
          search_field: "Planet of the Vampires The Demon Planet Planet of Blood Space Mutants Terror in Space The Haunted Planet The Haunted World The Outlawed Planet The Planet of Terror The Planet of the Damned"
        }
      ]  
    }  
  );

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    })
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  it ('will test empty results', async () => {
    const service = new SearchService();
    const progs = await service.findProgram('Forest Gump');

    expect(progs).toHaveLength(0);
  });

  it ('finds simple program', async () => {
    const service = new SearchService();
    const progs = await service.findProgram('Beyond Space');
  
    expect(progs).toHaveLength(1);
    const program = progs[0];
    expect(program.title[0]).toEqual('It! The Terror From Beyond Space');
    expect(program.year).toEqual('1958');
    expect(program.director[0].name).toEqual('Edward L. Cahn')
  });

  it ('finds program with alternate titles and director aliases', async () => {
    const service = new SearchService();
    const progs = await service.findProgram('Demon');
  
    expect(progs).toHaveLength(1);
    const program = progs[0];

    expect(program.title).toHaveLength(10)
    expect(program.title[0]).toEqual('Planet of the Vampires');
    expect(program.year).toEqual('1965');
    expect(program.director[0].name).toEqual('Mario Bava')
    expect(program.director[0].alias).toHaveLength(3)
  });

  it ('finds multiple programs', async () => {
    const service = new SearchService();
    const progs = await service.findProgram('Space');

    expect(progs).toHaveLength(2);
    expect(progs[0].title[0]).toEqual('It! The Terror From Beyond Space');
    expect(progs[1].title).toHaveLength(10)
    expect(progs[1].title[0]).toEqual('Planet of the Vampires');
  })

})
