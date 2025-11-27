import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const requestClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 60000,
})

requestClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export default requestClient
