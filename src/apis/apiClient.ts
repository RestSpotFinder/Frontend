import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://www.restspotfinder.kr/api'
    : 'https://www.restspotfinder.kr/api',
})

export default apiClient
