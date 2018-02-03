import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}
const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(baseUrl + '/'+ id)
}

const update = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson)
  return request.then(response=>response.data)
}

export default { getAll, create, remove, update }
