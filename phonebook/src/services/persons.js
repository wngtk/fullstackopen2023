import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const remove = async (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

const update = async (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  const res = await req
  return res.data
}

export default {
  getAll,
  create,
  remove,
  update
}
