import axios from 'axios'
import { API_URL, TOKEN } from '../config'

export const $api = axios.create({
  baseURL: API_URL,
})
// asd
$api.defaults.headers.common['Accept'] = 'application/json'

export const initApp = () => {
  const token = localStorage.getItem(TOKEN)
  $api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token)
  $api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const getToken = () => {
  const token = localStorage.getItem(TOKEN)
  return token
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN)
  $api.defaults.headers.common.Authorization = ``
}

// Language
$api.interceptors.request.use((config) => {
  return config
})
