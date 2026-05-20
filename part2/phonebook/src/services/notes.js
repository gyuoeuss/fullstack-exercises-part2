import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons/'
const baseUrl = ' https://studies.cs.helsinki.fi/restcountries/api/name/taiwan'

const getAll = () => {
    const response = axios.get(baseUrl)
    console.log(response)
    return response.then(response => response.data)
}

const create = nameObject => {
    const response = axios.post(baseUrl, nameObject)
    return response.then(response => response.data)
}
const update = (id, nameObject) => {
    const response = axios.put(baseUrl+`${id}`, nameObject)
    return response.then(response => response.data)
}
const getOff = (id) => {
    return(axios.delete(baseUrl + `${id}`))
}

export default { getAll, create, update, getOff }