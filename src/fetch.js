import axios from 'axios'

export const fetch = axios.create({
  baseURL: 'https://api.additivasia.io/api/v1/assignment/employees'
})

fetch.interceptors.response.use(res => {
  return res.data
})
