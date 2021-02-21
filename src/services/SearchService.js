import axios from 'axios'

class SearchService {

  async loadAllPrograms() {
    axios.get("http://localhost:4001/programs/all")
      .then(response => {
        console.log("received 'data'")
        response.data
      })
      .catch(error => console.error(`whoops`))
  }
}

export default SearchService