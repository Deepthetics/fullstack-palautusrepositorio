import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const deleteUrl = baseUrl + '/' + id
  const request = axios.delete(deleteUrl)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const updateUrl = baseUrl + '/' + id
  const request = axios.put(updateUrl, newObject)
  return request.then(response => response.data)
}

const exportObject = { getAll, create, remove, update }

export default exportObject
