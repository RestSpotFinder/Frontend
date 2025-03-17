import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:8080/api'
    : 'https://www.restspotfinder.kr/api',
})

export default apiClient