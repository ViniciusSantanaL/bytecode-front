import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

export const HttpPrivate = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
