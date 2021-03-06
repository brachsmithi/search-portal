class SearchService {

  async findProgram(searchText) {
    const source = await fetch('programs.json');
    const jsonData = await source.json();

    const programs = [];
    for(var i = 0; i < jsonData.program.length; i++) {
      const program = jsonData.program[i];
      if (program.search_field.toLowerCase().includes(searchText?.toLowerCase())) {
        programs.push(program)
      }
    }

    return programs;
  }
}

export default SearchService