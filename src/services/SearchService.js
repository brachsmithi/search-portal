import axios from 'axios'
import { response } from 'express';

class SearchService {

  async loadAllPrograms() {
    console.log("about to call db")
    return axios.get("http://localhost:4001/programs/all")
      .then(response => {
        console.log("received 'data'");
        return response.data;
      })
      .catch(error => console.error(`whoops`));
  }

  async findProgram(searchText) {
    console.log("about to call db")
    return axios.post("http://localhost:4001/programs/find", {search_text: searchText})
      .then(response => {
        console.log("received 'data'");
        return response.data;
      })
      .catch(error => console.error('whoops'));
  }
}

export default SearchService