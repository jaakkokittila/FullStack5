import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = request =>{
  try{
    const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, request, config)
  return response
  }catch(error){
    return error
  }
  
}

const like = (request, id) =>{
  try{
    const config = {
    headers: { Authorization: token },
  }
  const response = axios.put(`${baseUrl}/${id}`, request, config)
  
  return response
  }catch(error){
    return error
  }
  
}

const remove = id => {
  const response = axios.delete(`${baseUrl}/${id}`)
  return response
}

export default { getAll , setToken, like, add, remove}