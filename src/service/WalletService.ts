import { http } from './api'
import { TokenDTO } from './Auth/TokenDTO'
import { IWallet } from '../types/IWallet'

export default async function getBaseSymbolWallet() {
  const token = localStorage.getItem('@ByteCode:Token') as string
  const appToken = JSON.parse(token) as TokenDTO
  const promise = await http.get<IWallet>('/wallet/base', {
    headers: {
      Authorization: `Bearer ${appToken.token}`
    }
  })
  return promise.data
}
