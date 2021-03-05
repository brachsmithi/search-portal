import { json } from "express";

class SearchService {

  async findProgram(searchText) {
    const source = await fetch('programs.json');
    const jsonData = await source.json();
    const data = JSON.parse(jsonData)

    const programs = [];
    for(var i = 0; i < data.program.length; i++) {
      const program = data.program[i];
      if (program.search_field.includes(searchText)) {
        programs.push(program)
      }
    }

    return programs;
  }
}

export default SearchService