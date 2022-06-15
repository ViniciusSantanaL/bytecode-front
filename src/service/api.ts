import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://bytecode-front.herokuapp.com/api/'
})

export const HttpPrivate = axios.create({
  baseURL: 'https://bytecode-front.herokuapp.com/api/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
