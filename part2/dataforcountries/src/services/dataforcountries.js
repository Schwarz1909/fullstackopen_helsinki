import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrlByName = 'https://studies.cs.helsinki.fi/restcountries/api/name/finland'

const getAll = () => {
    const request = axios.get(baseUrl)
    //console.log(request)
    return request.then(response => response.data)
  }

const getByName = (name) => {
    const request = axios.get(baseUrlByName)
    //console.log(request)
    return request.then(response => response.data)
  }

  export default { getAll, getByName }
