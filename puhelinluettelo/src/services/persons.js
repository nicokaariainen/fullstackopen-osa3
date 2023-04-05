import axios from "axios"

const baseUrl = "/api/persons"

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObj => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}

const edit = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getPersons, create, edit, remove }