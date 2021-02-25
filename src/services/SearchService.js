import axios from 'axios'
import { response } from 'express';

class SearchService {

  async loadAllPrograms() {
    return axios.get("http://localhost:4001/programs/all")
      .then(response => {
        return response.data;
      })
      .catch(error => console.error(`whoops`));
  }

  async findProgram(searchText) {
    return axios.post("http://localhost:4001/programs/find", {search_text: searchText})
      .then(response => {
        return response.data;
      })
      .catch(error => console.error('whoops'));
  }
}

export default SearchService