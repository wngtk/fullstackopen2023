import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => {
    return axios.post(baseUrl, person)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { create, getAll, remove }
