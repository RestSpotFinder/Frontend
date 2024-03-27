import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://restspotfinder.site/api'
    : 'http://localhost:8080/api',
})

export default apiClient
