import { atom } from 'recoil'
import { IExchangeRates } from '../types/IExchangeRates'

export interface InfoCoins {
  id: number
  symbol: string
  name: string
}
export const listCoins = atom<InfoCoins[]>({
  key: 'listCoins',
  default: []
})

export const exchangeRateFromBaseCoin = atom<IExchangeRates>({
  key: 'exchangeRateFromBaseCoin',
  default: {
    baseSymbol: '',
    coinsBase: [{ symbol: '', rate: 0 }]
  }
})
