import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://61.97.187.101:8080/api'
    : 'https://restspotfinder.site/api',
})

export default apiClient