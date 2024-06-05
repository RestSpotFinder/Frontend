import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:8080/api'
    : 'https://restspotfinder.site/api',
})

export default apiClient
